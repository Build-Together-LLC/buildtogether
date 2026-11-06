def autoname(doc, method=None):
	"""Name an Employee's Bank Account "<account no> - <employee> - <bank>".

	ERPNext's default "<account name> - <bank>" collides when the same employee
	changes to another account at the same bank (same name, different number).
	Other parties keep the standard name.
	"""
	if doc.party_type == "Employee" and doc.party and doc.bank_account_no:
		doc.name = f"{doc.bank_account_no} - {doc.party} - {doc.bank}"
