import re

import frappe


def validate_names(doc, method):
	"""
	Allow single-name Employee records (last_name optional).
	Safely build employee_name from whatever name parts exist.
	"""
	name_parts = [doc.first_name, doc.middle_name, doc.last_name]
	full_name = " ".join(part.strip() for part in name_parts if part and part.strip())

	if not full_name:
		frappe.throw("Employee must have at least a First Name.")

	doc.employee_name = full_name


# Employee fields that feed the Bank Account; a change in any of them triggers a sync.
BANK_SYNC_FIELDS = ("bank_name", "bank_ac_no", "ifsc_code", "employee_name", "iban")


def clean_account_no(value):
	"""Remove the spaces and hyphens banks use to group digits, so the same
	account always compares equal (e.g. "1234 5678-9012" -> "123456789012")."""
	return re.sub(r"[\s\-]", "", str(value)) if value else value


def normalize_bank_details(doc, method=None):
	"""Employee validate: keep the account number and IFSC in one canonical form."""
	if doc.bank_ac_no:
		doc.bank_ac_no = clean_account_no(doc.bank_ac_no)
	if doc.ifsc_code:
		doc.ifsc_code = doc.ifsc_code.strip().upper()


def sync_bank_account(doc, method=None):
	"""Employee on_update: create or update the employee's Bank Account.

	Nothing happens unless Bank, Account No. and IFSC are all filled, so none of
	them is mandatory and no error is raised for an employee without bank details.
	A failure here never blocks saving the employee; it is written to the Error Log.
	"""
	if not (doc.bank_name and doc.bank_ac_no and doc.ifsc_code):
		return

	if not any(doc.has_value_changed(f) for f in BANK_SYNC_FIELDS):
		return

	try:
		_upsert_bank_account(doc)
	except Exception:
		frappe.log_error(
			title=f"Bank Account sync failed for {doc.name}",
			message=frappe.get_traceback(),
			reference_doctype="Employee",
			reference_name=doc.name,
		)
		frappe.msgprint(
			f"Could not create or update the Bank Account for {doc.employee_name}. See the Error Log.",
			indicator="orange",
			alert=True,
		)


def _upsert_bank_account(doc):
	number = clean_account_no(doc.bank_ac_no)

	# One query: everything this employee already has.
	accounts = frappe.get_all(
		"Bank Account",
		filters={"party_type": "Employee", "party": doc.name},
		fields=[
			"name",
			"bank",
			"bank_account_no",
			"account_name",
			"branch_code",
			"iban",
			"is_default",
			"disabled",
		],
	)

	# Same bank + same account number (compared cleaned) = the same account.
	match = next(
		(a for a in accounts if a.bank == doc.bank_name and clean_account_no(a.bank_account_no) == number),
		None,
	)

	details = {
		"account_name": doc.employee_name,
		"bank_account_no": number,
		"branch_code": doc.ifsc_code,
		"iban": doc.iban or None,
	}

	if match:
		changes = {k: v for k, v in details.items() if (match.get(k) or None) != (v or None)}
		if not changes and match.is_default and not match.disabled:
			return  # already exactly right

		ba = frappe.get_doc("Bank Account", match.name)
		ba.update(changes)
		ba.is_default = 1  # ERPNext un-defaults the employee's other accounts on save
		ba.disabled = 0
		ba.save(ignore_permissions=True)
		frappe.msgprint(f"Bank Account {ba.name} updated for {doc.employee_name}", alert=True)
		return

	# Different bank or account number: keep the old account untouched, add a new default one.
	_ensure_account_type("Savings")
	ba = frappe.get_doc(
		{
			"doctype": "Bank Account",
			"bank": doc.bank_name,
			"party_type": "Employee",
			"party": doc.name,
			"is_company_account": 0,
			"is_default": 1,
			"account_type": "Savings",
			**details,
		}
	).insert(ignore_permissions=True)
	frappe.msgprint(f"Bank Account {ba.name} created for {doc.employee_name}", alert=True)


def _ensure_account_type(name):
	if not frappe.db.exists("Bank Account Type", name):
		frappe.get_doc({"doctype": "Bank Account Type", "account_type": name}).insert(ignore_permissions=True)
