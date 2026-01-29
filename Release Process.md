# 🚀 Release Process

## Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Draft (Alpha)

---

### 🎯 Purpose

This document defines the official release process for the Proof‑of‑Contribution Protocol Core.  
#### It ensures that every release is:

- Deterministic  
- Auditable  
- Governance‑aligned  
- Versioned correctly  
- Documented thoroughly  
- Safe for integrators and downstream ecosystems  

This process applies to all maintainers and all release types.

---

##### 1. Release Types

The protocol uses semantic versioning:

MAJOR (X.0.0)
Breaking changes to protocol semantics, scoring rules, or validator behavior.

MINOR (0.X.0)
New features, new validators, new scoring rules, or non‑breaking improvements.

PATCH (0.0.X)
Bug fixes, documentation updates, CI improvements, or non‑functional changes.

---

#### 2. Preconditions for Any Release

##### Before a release can be created:

- All tests must pass  
- All CI workflows must be green  
- Documentation must be updated  
- Changelog must be updated  
- Version bump must be applied  
- No open security issues  
- No unreviewed PRs affecting the release  
- Governance approval (for MAJOR releases)  

---

#### 3. Release Workflow

##### Step 1 — Create a Release Branch

`bash
git checkout -b release/v0.1.1
`

Release branches follow the naming pattern:

`
release/vX.Y.Z
`

---

##### Step 2 — Update Version

Update version in:

- package.json (if applicable)  
- VERSIONING.md  
- CHANGELOG.md  
- Any version fields in the spec  

---

###### Step 3 — Update Changelog

Add a new entry:

`md

v0.1.1 — YYYY‑MM‑DD

Added
- …

Changed
- …

Fixed
- …
`

#####Changelog entries must be:

- Clear  
- Concise  
- Auditable  

---

##### Step 4 — Run Full Test Suite

`bash
npm test
`

Or language‑specific equivalents.

All tests must pass.

---

###### Step 5 — Run Linting

`bash
npm run lint
`

Lint must pass with no errors.

---

###### Step 6 — Build the Project

`bash
npm run build
`

Build must succeed.

---

###### Step 7 — Final Maintainer Review

At least two maintainers must review:

- Code changes  
- Documentation updates  
- Version bump  
- Changelog entry  
- Release branch diff  

---

###### Step 8 — Governance Approval (MAJOR releases only)

For breaking changes:

- RFC must be approved  
- Governance must sign off  
- Version bump must reflect MAJOR change  

---

###### Step 9 — Merge Release Branch

`bash
git checkout main
git merge --no-ff release/v0.1.1
`

---

###### Step 10 — Tag the Release

`bash
git tag -a v0.1.1 -m "Release v0.1.1"
git push origin v0.1.1
`

Tags must match semantic versioning exactly.

---

###### Step 11 — Publish Release Notes

Release notes must include:

- Summary  
- Changes  
- Migration notes (if any)  
- Links to RFCs (if applicable)  
- Security considerations  
- Contributors  

---

##### Step 12 — Update Documentation Site

Deploy updated docs:

`bash
npm run docs:build
npm run docs:deploy
`

Or via GitHub Actions.

---

### 4. Post‑Release Tasks

After a release:

- Announce in community channels  
- Update roadmap if needed  
- Close related issues  
- Mark RFCs as “Implemented”  
- Begin next development cycle  

---

### 5. Emergency Patch Releases

For critical fixes:

- Skip release branch  
- Apply fix directly to main  
- Bump PATCH version  
- Tag and publish immediately  
- Document reason in changelog  
- Notify maintainers and community  

---

### 6. Release Cadence

Recommended cadence:

- Patch: as needed  
- Minor: monthly or quarterly  
- Major: governance‑approved only  

---

✔️ Status

This release process is in Alpha and will evolve as the protocol matures.
