# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| latest  | ✅ Yes             |
| < latest | ❌ No             |

We only provide security updates for the latest version on the `main` branch.

---

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

1. **Do NOT open a public GitHub issue.** Public disclosure before a fix is available puts all users at risk.
2. **Email us directly** at: **[fullstackrakibul@gmail.com](mailto:fullstackrakibul@gmail.com)**
3. Include the following details:
   - A clear description of the vulnerability
   - Steps to reproduce the issue
   - The potential impact of the vulnerability
   - Any suggested fixes (optional but appreciated)

### What to Expect

| Step | Timeline |
|------|----------|
| Acknowledgment of your report | Within **48 hours** |
| Initial assessment | Within **5 business days** |
| Resolution or mitigation plan | Within **30 days** |
| Public disclosure (if applicable) | After the fix is released |

---

## Security Best Practices for Contributors

When contributing to this project, please follow these guidelines:

### Authentication & Secrets
- **Never commit** real credentials, API keys, tokens, or secrets
- Use `.env` files for local configuration (already in `.gitignore`)
- The mock credentials in `auth.ts` are for **development only** — always integrate a real auth provider in production

### Dependencies
- Keep dependencies up to date (`npm audit` regularly)
- Review new dependency additions for known vulnerabilities
- Prefer well-maintained packages with active communities

### Code Practices
- Sanitize and validate all user inputs
- Use parameterized queries when integrating with databases
- Follow the principle of least privilege for API endpoints
- Never expose sensitive error details in production

---

## Known Security Considerations

> ⚠️ **This is a boilerplate/starter template.** The following items should be addressed before deploying to production:

| Item | Status | Action Required |
|------|--------|----------------|
| Mock authentication | ⚠️ Demo only | Replace with real auth provider (OAuth, JWT, etc.) |
| No HTTPS enforcement | ⚠️ Dev default | Configure HTTPS in your deployment |
| No rate limiting | ⚠️ Not included | Add rate limiting middleware on your API |
| No CSP headers | ⚠️ Not configured | Configure Content Security Policy headers |
| localStorage for tokens | ⚠️ Basic | Consider httpOnly cookies for production |

---

## Acknowledgments

We appreciate the security research community and all contributors who help keep this project safe. Responsible reporters will be credited (with permission) in our release notes.

---

Thank you for helping keep **microVueBoilerPlate** and its users safe! 🔒
