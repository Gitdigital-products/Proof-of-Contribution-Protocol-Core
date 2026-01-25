# 📘 Proof‑of‑Contribution Protocol — Core Specification (spec.md)

1. Overview
The Proof‑of‑Contribution Protocol (PoC Protocol) defines a standardized, verifiable way to describe, validate, and attest to contributions made within a project, organization, or ecosystem.  
It provides a deterministic schema (pow.yaml) and a validation pipeline that ensures contributions are:

- Authenticated  
- Structured  
- Machine‑verifiable  
- Portable across systems  
- Suitable for indexing, rewards, compliance, and governance workflows  

This specification defines the data model, validation rules, state transitions, and guarantees of the protocol.

---

2. Goals
The protocol is designed to:

- Provide a unified contribution format across diverse ecosystems  
- Enable trust‑minimized verification of contribution metadata  
- Support automation for indexing, rewards, and compliance  
- Ensure forward‑compatible versioning  
- Maintain developer‑friendly ergonomics  

---

3. Core Concepts

3.1 Contribution
A Contribution is a structured record describing work performed by a contributor.  
Examples include:

- Code commits  
- Documentation  
- Research  
- Design  
- Community moderation  
- Governance actions  

Each contribution must include:

- Contributor identity  
- Timestamp  
- Category  
- Description  
- Evidence (links, hashes, artifacts)  

---

3.2 Proof‑of‑Work Document (pow.yaml)
The pow.yaml file is the canonical representation of contributions for a project or workflow.  
It is validated against the POW-schema.json and must adhere to:

- Required fields  
- Type constraints  
- Enum constraints  
- Structural rules  

---

3.3 Validation Pipeline
The protocol defines a deterministic validation pipeline:

1. Schema Validation  
2. Semantic Validation  
3. Reference Validation  
4. Integrity Validation  

Each stage must pass for the document to be considered valid.

---

4. Data Model

4.1 Top‑Level Structure
A valid pow.yaml MUST contain:

`yaml
version: "1.x"
project:
  id: "string"
  name: "string"
contributors:
  - id: "string"
    name: "string"
contributions:
  - id: "string"
    contributor: "string"
    category: "enum"
    description: "string"
    evidence:
      - type: "enum"
        uri: "string"
        hash: "optional string"
metadata:
  created_at: "ISO8601"
  updated_at: "ISO8601"
`

---

4.2 Required Fields
| Field | Required | Description |
|-------|----------|-------------|
| version | Yes | Protocol version (SemVer) |
| project | Yes | Project metadata |
| contributors | Yes | List of contributor identities |
| contributions | Yes | List of contribution entries |
| metadata | Yes | Document timestamps |

---

4.3 Contribution Categories
The protocol defines a baseline set of categories:

- code  
- documentation  
- research  
- design  
- community  
- governance  
- other  

Projects may extend categories via namespaced identifiers.

---

4.4 Evidence Types
Evidence MUST be one of:

- url  
- commit  
- hash  
- artifact  
- transaction  

---

5. Validation Rules

5.1 Schema Validation
The document MUST conform to POW-schema.json.

5.2 Semantic Validation
Rules include:

- Contribution IDs must be unique  
- Contributor IDs must reference a valid contributor  
- Categories must be valid enums  
- Evidence entries must contain required fields  

---

5.3 Reference Validation
All evidence URIs MUST resolve to a valid resource or follow a supported format.

---

5.4 Integrity Validation
If evidence includes hashes:

- Hash must be valid hex  
- Hash must match the referenced artifact  

---

6. State Transitions

6.1 Creation
A new pow.yaml is created with:

- Version set  
- Initial contributors  
- Initial contributions  
- Metadata timestamps  

6.2 Update
Updates MUST:

- Increment updated_at  
- Maintain immutability of historical contribution IDs  
- Follow versioning rules  

6.3 Deprecation
A document may be deprecated by:

- Setting deprecated: true in metadata  
- Providing a replaced_by reference  

---

7. Guarantees

The protocol guarantees:

- Deterministic validation  
- Forward‑compatible versioning  
- Machine‑readable and human‑readable structure  
- Extensibility without breaking changes  
- Interoperability across ecosystems  

---

8. Versioning

The protocol follows Semantic Versioning:

- MAJOR — breaking schema changes  
- MINOR — new fields, categories, or capabilities  
- PATCH — fixes or clarifications  

---

9. Reference Implementation

The reference implementation includes:

- JSON schema (POW-schema.json)  
- TypeScript types  
- Validation engine  
- Example pow.yaml files  

This repository is the canonical source of truth.

---

10. Future Extensions

Planned extensions include:

- Cryptographic signatures  
- Contributor identity attestation  
- On‑chain anchoring  
- Reward indexing  
- Multi‑project aggregation  

---
