# buildtogether.co.in — company website

Static, dependency-free marketing site (HTML + CSS + vanilla JS) for Firebase Hosting.

## Pages
| URL | File |
|---|---|
| `/` | `public/index.html` — Home |
| `/services` | `public/services.html` — ERPNext implementation, customisation, integrations, migration, support, FAQ |
| `/ai-automation` | `public/ai-automation.html` — AI agents, Document AI, workflow automation, forecasting |
| `/industries` | `public/industries.html` |
| `/about` | `public/about.html` — story, founders, values |
| `/contact` | `public/contact.html` — enquiry form (email + WhatsApp) |

The header, footer and floating WhatsApp button are rendered by `public/assets/js/site.js`, so nav changes happen in one place.

## Before going live: edit `SITE` at the top of `public/assets/js/site.js`
- `email`: the inbox that receives enquiries
- `whatsapp`: country code + number, digits only (e.g. `919876543210`)
- `phoneDisplay`, `linkedin`, `location`
- `formEndpoint` (optional): a [Formspree](https://formspree.io) endpoint so the form sends email
  directly. If left empty, "Send by email" opens the visitor's mail app with the message pre-filled.

## Re-theming
All colours are CSS variables at the top of `public/assets/css/styles.css` (`--brand`, `--violet`, `--cyan`, `--night`…).

## Preview locally
```bash
cd website && npx firebase-tools serve      # or: firebase emulators:start --only hosting
```

## Deploy
```bash
cd website
firebase login
firebase use --add            # pick the existing Firebase project that hosts buildtogether.co.in
firebase deploy --only hosting
```
