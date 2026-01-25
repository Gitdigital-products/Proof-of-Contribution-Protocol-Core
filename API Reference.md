# 📘  API Reference (api.md)

Overview
This document describes the public API surface of the Proof‑of‑Contribution Protocol Core reference implementation.  
It covers validation functions, types, error formats, and integration patterns.

---

1. Importing the Library

`ts
import {
  validate,
  validateSchema,
  validateSemantics,
  validateReferences,
  validateIntegrity,
  normalize,
  loadPowFile
} from "@gitdigital/poc-protocol-core";
`

---

2. Functions

2.1 validate(pow: string | object)
Runs the full validation pipeline.

Returns:
`ts
{
  valid: boolean;
  errors: ValidationError[];
  normalized?: PowDocument;
}
`

---

2.2 validateSchema(pow)
Validates against the JSON schema.

Errors include:
- Missing required fields  
- Invalid types  
- Enum mismatches  

---

2.3 validateSemantics(pow)
Checks logical consistency.

Rules include:
- Unique IDs  
- Contributor references  
- Category validity  

---

2.4 validateReferences(pow)
Validates evidence URIs.

Checks:
- URL format  
- Commit reference format  
- Artifact reference format  

---

2.5 validateIntegrity(pow)
Validates hashes.

Checks:
- Hex format  
- Hash matches artifact (if provided)  

---

2.6 normalize(pow)
Converts YAML → canonical JSON representation.

---

2.7 loadPowFile(path)
Loads and parses a pow.yaml file.

---

3. Types

3.1 PowDocument
Strongly typed representation of the entire document.

3.2 ValidationError
`ts
{
  path: string;
  message: string;
  severity: "error" | "warning";
}
`

---

