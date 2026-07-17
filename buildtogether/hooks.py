app_name = "buildtogether"
app_title = "BuildTogether"
app_publisher = "aman@buildtogether.co.in"
app_description = "This is the app customising the requirements of BuildTogether"
app_email = "aman@buildtogether.co.in"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "buildtogether",
# 		"logo": "/assets/buildtogether/logo.png",
# 		"title": "BuildTogether",
# 		"route": "/buildtogether",
# 		"has_permission": "buildtogether.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include_js = "/assets/buildtogether/js/buildtogether.js"
# include_css = "/assets/buildtogether/css/buildtogether.css"

# Overriding Methods
# ------------------
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "buildtogether.event.get_events"
# }

# Document Events
# ---------------
# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------
# scheduler_events = {
# 	"all": [
# 		"buildtogether.tasks.all"
# 	],
# 	"daily": [
# 		"buildtogether.tasks.daily"
# 	],
# 	"hourly": [
# 		"buildtogether.tasks.hourly"
# 	],
# 	"weekly": [
# 		"buildtogether.tasks.weekly"
# 	],
# 	"monthly": [
# 		"buildtogether.tasks.monthly"
# 	],
# }

# Testing
# -------
# before_tests = "buildtogether.install.before_tests"

# Overriding DocType Classes
# --------------------------
# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Overriding Jinja Mapping
# ------------------------
# jinja = {
# 	"methods": "buildtogether.utils.jinja_methods",
# 	"filters": "buildtogether.utils.jinja_filters"
# }

# Setup Wizard
# ------------
# setup_wizard_stages = "buildtogether.setup.get_setup_wizard_stages"

# User Data Protection
# --------------------
# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------
# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["buildtogether.utils.before_request"]
# after_request = ["buildtogether.utils.after_request"]

# Job Events
# ----------
# before_job = ["buildtogether.utils.before_job"]
# after_job = ["buildtogether.utils.after_job"]

# Authentication and authorization
# --------------------------------
# auth_hooks = [
# 	"buildtogether.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
export_python_type_annotations = True

default_log_clearing_doctypes = {
	"Logging DocType Name": 30
}

# Translation
# ------------
# List of apps whose translatable strings should be excluded from this app's translations.
# ignore_translatable_strings_from = []

# Custom App Customizations Fixtures
# ----------------------------------
fixtures = [
    {
        "dt": "Custom Field",
        "filters": [["dt", "in", ["Employee"]]]
    },
    {
        "dt": "Property Setter",
        "filters": [["doc_type", "in", ["Employee"]]]
    }
]
