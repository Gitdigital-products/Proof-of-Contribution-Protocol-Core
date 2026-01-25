# 📘  Diagrams (Text‑Based + Descriptions)
These go into /docs/diagrams/.

Validation Pipeline Diagram

`
+------------------+
|   pow.yaml       |
+------------------+
          |
          v
+------------------+
| Schema Validation|
+------------------+
          |
          v
+----------------------+
| Semantic Validation  |
+----------------------+
          |
          v
+------------------------+
| Reference Validation   |
+------------------------+
          |
          v
+------------------------+
| Integrity Validation   |
+------------------------+
          |
          v
+------------------+
|   VALID DOC      |
+------------------+
`

Description:  
This diagram shows the deterministic, linear validation pipeline. Each stage must pass before the next begins.

---
