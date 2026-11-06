import frappe


def execute():
	"""Remove Employee.custom_ifsc_code and Employee.custom_bank_account.

	IFSC now lives in the standard Employee.ifsc_code field. Existing values are
	copied over first (only where ifsc_code is empty) so nothing is lost.
	custom_bank_account was only a back-reference; the Bank Account still links
	to the Employee through its own party fields.
	"""
	has_std = frappe.db.has_column("Employee", "ifsc_code")

	if has_std and frappe.db.has_column("Employee", "custom_ifsc_code"):
		frappe.db.sql(
			"""
			update `tabEmployee`
			set ifsc_code = custom_ifsc_code
			where ifnull(ifsc_code, '') = '' and ifnull(custom_ifsc_code, '') != ''
			"""
		)

	to_delete = ["Employee-custom_bank_account"]
	if has_std:
		to_delete.append("Employee-custom_ifsc_code")

	for name in to_delete:
		if frappe.db.exists("Custom Field", name):
			frappe.delete_doc("Custom Field", name, force=True)

	frappe.clear_cache(doctype="Employee")
