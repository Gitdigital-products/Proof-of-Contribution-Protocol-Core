# 📘 1. pow.yaml Human‑Readable Specification (pow-yaml-spec.md)

Overview
pow.yaml is the canonical, human‑authored configuration file that describes contributions, contributors, project metadata, and evidence.  
This document defines every field, its purpose, constraints, and examples.

---

1. Top‑Level Structure

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

2. Field‑by‑Field Specification

2.1 version
- Type: string  
- Format: SemVer  
- Purpose: Defines the protocol version used by this document.  
- Example: "1.0.0"

---

2.2 project
Metadata describing the project or domain the contributions belong to.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique project identifier |
| name | string | Yes | Human‑readable project name |

---

2.3 contributors
A list of contributor identities.

Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique contributor ID |
| name | string | Yes | Human‑readable name |

---

2.4 contributions
A list of contribution records.

Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique contribution ID |
| contributor | string | Yes | Must match a contributor ID |
| category | enum | Yes | Contribution category |
| description | string | Yes | Human‑readable summary |
| evidence | array | Yes | Evidence supporting the contribution |

---

2.5 evidence
Each evidence entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | enum | Yes | One of: url, commit, hash, artifact, transaction |
| uri | string | Yes | Reference to the evidence |
| hash | string | Optional | Hash of the artifact |

---

2.6 metadata
Document‑level metadata.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| created_at | ISO8601 | Yes | Creation timestamp |
| updated_at | ISO8601 | Yes | Last update timestamp |

---

3. Validation Rules
- All IDs must be unique.  
- All contributor references must resolve.  
- Categories must be valid enums.  
- Evidence must contain required fields.  
- Hashes must be valid hex if present.  

---

4. Example

`yaml
version: "1.0.0"
project:
  id: "gd-001"
  name: "GitDigital Core"
contributors:
  - id: "richard"
    name: "Richard"
contributions:
  - id: "c1"
    contributor: "richard"
    category: "code"
    description: "Implemented schema validation"
    evidence:
      - type: "commit"
        uri: "https://github.com/.../commit/abc123"
metadata:
  created_at: "2025-01-01T00:00:00Z"
  updated_at: "2025-01-02T00:00:00Z"
`

---

📘 2. Architecture Overview (architecture.md)

1. High‑Level Architecture
The Proof‑of‑Contribution Protocol Core is composed of:

- Schema Layer  
  Defines the structure of pow.yaml via JSON schema.

- Validation Engine  
  Performs schema, semantic, reference, and integrity validation.

- Type System  
  Strongly‑typed TypeScript definitions for all protocol objects.

- Examples & Templates  
  Provide reference implementations for developers.

---

2. Flow Diagram (Textual)

`
pow.yaml
   ↓
Schema Validation (JSON Schema)
   ↓
Semantic Validation (IDs, categories, references)
   ↓
Reference Validation (URIs, commits, artifacts)
   ↓
Integrity Validation (hashes)
   ↓
VALID DOCUMENT
`

---

3. Components

3.1 Schema
- Located in /schema  
- Defines all fields, types, enums, and constraints  
- Versioned independently  

3.2 Validation Engine
- Located in /src/validation  
- Exposes functions:  
  - validateSchema()  
  - validateSemantics()  
  - validateReferences()  
  - validateIntegrity()  

3.3 Types
- Located in /src/types  
- Auto‑generated from schema  
- Ensures type‑safe consumption  

3.4 Examples
- Located in /examples  
- Provide real‑world usage patterns  

---

4. Integration Points
- CI/CD validation  
- Backend ingestion  
- Indexers  
- Reward engines  
- Compliance systems  

---

📘 3. Integration Guide (integration-guide.md)

1. Overview
This guide explains how to integrate the Proof‑of‑Contribution Protocol into any backend, CI pipeline, or developer workflow.

---

2. Installation

Node.js
`bash
npm install @gitdigital/poc-protocol-core
`

---

3. Validating a pow.yaml File

Basic Example
`ts
import { validate } from "@gitdigital/poc-protocol-core";
import fs from "fs";

const pow = fs.readFileSync("pow.yaml", "utf8");
const result = validate(pow);

if (result.valid) {
  console.log("Valid!");
} else {
  console.error(result.errors);
}
`

---

4. CI/CD Integration

GitHub Actions
`yaml
name: Validate PoC Document

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run validate-pow
`

---

5. Backend Integration

Use Cases
- Reward distribution  
- Contribution indexing  
- Compliance workflows  
- Contributor dashboards  

Pattern
1. Receive pow.yaml  
2. Validate  
3. Store normalized representation  
4. Index contributions  
5. Trigger downstream workflows  

---

6. Error Handling
Validation errors include:

- Missing required fields  
- Invalid enums  
- Broken references  
- Hash mismatches  

Each error includes:

- Path  
- Message  
- Severity  

---

7. Best Practices
- Always pin protocol version  
- Validate before merging  
- Use contributor IDs consistently  
- Store normalized JSON internally  

