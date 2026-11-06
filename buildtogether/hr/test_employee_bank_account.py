import frappe
from frappe.tests import IntegrationTestCase
from frappe.utils import today

# Only link targets we create ourselves, so no other test records are pulled in.
IGNORE_TEST_RECORD_DEPENDENCIES = ["Company", "Bank", "Bank Account Type"]


class IntegrationTestEmployeeBankAccount(IntegrationTestCase):
	"""Employee save creates / updates / reuses the Bank Account; nothing is mandatory."""

	def setUp(self):
		for bank in ("T Bank A", "T Bank B"):
			if not frappe.db.exists("Bank", bank):
				frappe.get_doc({"doctype": "Bank", "bank_name": bank}).insert()

		self.emp = frappe.get_doc(
			{
				"doctype": "Employee",
				"first_name": "Zztest",
				"last_name": "Bank",
				"gender": "Male",
				"date_of_birth": "1995-01-01",
				"date_of_joining": today(),
				"company": frappe.db.get_value("Company", {}, "name"),
				"cell_number": "9000000099",
				"status": "Active",
			}
		).insert()

	def accounts(self):
		return frappe.get_all(
			"Bank Account",
			filters={"party_type": "Employee", "party": self.emp.name},
			fields=["name", "bank", "bank_account_no", "branch_code", "is_default"],
			order_by="creation",
		)

	def set_bank(self, bank=None, number=None, ifsc=None):
		self.emp.reload()
		self.emp.update({"bank_name": bank, "bank_ac_no": number, "ifsc_code": ifsc})
		self.emp.save()

	def test_nothing_happens_without_all_three_details(self):
		self.assertEqual(self.accounts(), [])
		self.set_bank("T Bank A", "1234 5678", None)
		self.assertEqual(self.accounts(), [])

	def test_creates_account_with_clean_values(self):
		self.set_bank("T Bank A", "1234 5678-9012", "abcd0001234")
		(acc,) = self.accounts()
		self.assertEqual(acc.bank_account_no, "123456789012")
		self.assertEqual(acc.branch_code, "ABCD0001234")
		self.assertTrue(acc.is_default)

	def test_same_bank_and_number_updates_instead_of_duplicating(self):
		self.set_bank("T Bank A", "123456789012", "ABCD0001234")
		self.set_bank("T Bank A", "1234-5678 9012", "ABCD0009999")
		(acc,) = self.accounts()
		self.assertEqual(acc.branch_code, "ABCD0009999")

	def test_different_number_or_bank_creates_new_and_keeps_old(self):
		self.set_bank("T Bank A", "123456789012", "ABCD0001234")
		self.set_bank("T Bank A", "999900001111", "ABCD0001234")
		self.set_bank("T Bank B", "999900001111", "ABCD0001234")
		accounts = self.accounts()
		self.assertEqual(len(accounts), 3)
		self.assertEqual(len({a.name for a in accounts}), 3)
		self.assertEqual([a.bank_account_no for a in accounts if a.is_default], ["999900001111"])

	def test_going_back_to_an_old_account_reuses_it(self):
		self.set_bank("T Bank A", "123456789012", "ABCD0001234")
		self.set_bank("T Bank A", "999900001111", "ABCD0001234")
		self.set_bank("T Bank A", "123456789012", "ABCD0001234")
		accounts = self.accounts()
		self.assertEqual(len(accounts), 2)
		self.assertEqual([a.bank_account_no for a in accounts if a.is_default], ["123456789012"])

	def test_clearing_bank_details_still_saves(self):
		self.set_bank("T Bank A", "123456789012", "ABCD0001234")
		self.set_bank(None, None, None)
		self.assertEqual(len(self.accounts()), 1)
