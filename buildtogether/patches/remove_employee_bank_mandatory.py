import frappe


def execute():
	"""Stop forcing Bank Name and Bank A/C No. on Employee.

	These two Property Setters were added by the BuildTogether app (BT-EMP-08).
	Deleting them restores the standard ERPNext behaviour, where both fields
	are optional. Fixtures only add or update records, so existing sites need
	this patch to drop them.
	"""
	for name in ("Employee-bank_name-reqd", "Employee-bank_ac_no-reqd"):
		if frappe.db.exists("Property Setter", name):
			frappe.delete_doc("Property Setter", name, force=True, ignore_permissions=True)

	frappe.clear_cache(doctype="Employee")
