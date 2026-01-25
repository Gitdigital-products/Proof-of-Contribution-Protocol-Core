# 📘  Versioning Policy (versioning.md)

Versioning Policy

The Proof‑of‑Contribution Protocol uses Semantic Versioning:

- MAJOR — breaking schema changes  
- MINOR — new fields, categories, or capabilities  
- PATCH — fixes or clarifications  

---

Schema Versioning
Schema changes follow the same SemVer rules.

---

Backward Compatibility
- MINOR and PATCH updates must not break existing documents  
- Deprecations require at least one full MINOR cycle before removal  

---

Document Versioning
Each pow.yaml MUST specify:

`yaml
version: "1.x.x"
`

---

