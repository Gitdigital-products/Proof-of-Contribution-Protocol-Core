# 📘 Proof‑of‑Contribution Protocol

## Canonical Specification (spec.md)

Version: 0.1.0  
Status: Draft (Alpha)  
Maintainers: GitDigital Products  
Ecosystem: GitDigital • Solana‑Aligned

---

### 1. Purpose

The Proof‑of‑Contribution Protocol (PoC Protocol) provides a deterministic, transparent, and auditable method for measuring and verifying meaningful contributions across decentralized ecosystems.

#### It enables:

- Fair contributor recognition  
- Automated scoring  
- Trust‑minimized validation  
- Cross‑platform interoperability  
- Governance‑ready contribution data  

This specification defines the core logic, data structures, validation rules, and expected behaviors of the protocol.

---

### 2. Design Principles

- The protocol is built on the following principles:

#### Deterministic
- Given the same inputs, all nodes must compute the same result.

##### Minimalist
- No unnecessary data, no hidden state, no off‑chain secrets.

###### Composable
- Integrates cleanly with Solana programs, GitDigital Products, and external systems.

###### Auditable
- All logic must be transparent and reproducible.

###### Identity‑Agnostic
- The protocol does not require PII or centralized identity.

##### Modular
- Validation layers can be extended or replaced without breaking the core.

---

## 3. Core Concepts

### Contribution
A discrete action performed by a participant that can be evaluated and scored.

#### Examples:
- Code commits  
- Documentation updates  
- Governance participation  
- Issue triage  
- Community support  

#### Contribution Event
A structured record describing a contribution.

#### Validator
A module that verifies a contribution event.

#### Scoring Engine
A deterministic function that assigns a score to a validated contribution.

#### Contribution Proof
A signed, verifiable output representing the final score and validation state.

---

## 4. Data Structures

### 4.1 Contribution Event

`json
{
  "id": "string",
  "timestamp": "unix_timestamp",
  "actor": "publickeyor_identifier",
  "type": "string",
  "payload": {},
  "metadata": {}
}
`

### 4.2 Validation Result

`json
{
  "event_id": "string",
  "valid": true,
  "errors": [],
  "validator": "module_name",
  "version": "semver"
}
`

### 4.3 Scoring Output

`json
{
  "event_id": "string",
  "score": 0,
  "rules_applied": [],
  "version": "semver"
}
`

### 4.4 Contribution Proof

`json
{
  "event_id": "string",
  "score": 0,
  "validated": true,
  "signature": "optional_signature",
  "version": "semver"
}
`

---

## 5. Validation Rules

### Validation must be:

- Deterministic  
- Stateless  
- Transparent  
- Reproducible  

#### Required validation checks:

1. Schema validation  
2. Timestamp sanity  
3. Actor authenticity (if applicable)  
4. Contribution type validity  
5. Payload completeness  
6. Replay protection  
7. Rule‑specific validation  

If any check fails, the event is invalid.

---

## 6. Scoring Rules

### The scoring engine must:

- Apply rules deterministically  
- Produce the same score for the same event  
- Avoid randomness  
- Avoid external state  

#### Example scoring rule:

`
if type == "code_commit":
    score = 5
if type == "documentation":
    score = 3
if type == "governance_vote":
    score = 10
`

##### Rules must be defined in /spec/scoring-rules.md (to be added).

---

## 7. Contribution Proof Generation

### A valid contribution proof must include:

- Event ID  
- Score  
- Validation state  
- Optional signature  
- Protocol version  

#### Signatures are optional but recommended for:

- Cross‑platform verification  
- Governance systems  
- Reward distribution  

---

## 8. Determinism Requirements

### All implementations must guarantee:

- No randomness  
- No external API calls  
- No nondeterministic ordering  
- No floating‑point drift  
- No environment‑dependent behavior  

---

## 9. Versioning

### The protocol follows semantic versioning:

- MAJOR — breaking changes  
- MINOR — new features  
- PATCH — fixes  

All versioning rules are defined in /VERSIONING.md.

---

## 10. Security Considerations

### The protocol must defend against:

- Replay attacks  
- Spoofed contributions  
- Manipulated timestamps  
- Malicious payloads  
- Validator bypass attempts  

A full threat model is defined in /spec/threat-model.md.

---

## 11. Governance

### Protocol changes require:

- RFC submission  
- Maintainer review  
- Governance approval (if major)  

Minor changes may be merged by maintainers.

---

## 12. Reference Implementations

### Reference implementations will be provided in:

- /src (core logic)  
- /examples/javascript  
- /examples/rust  
- /examples/python  

---

## 13. Compliance Requirements

### Integrators must:

- Follow deterministic rules  
- Avoid storing PII  
- Maintain audit logs  
- Respect contributor privacy  
- Use secure key handling  

---

## 14. Future Extensions

### Planned extensions include:

- Cryptographic contribution proofs  
- Multi‑validator consensus  
- Weighted scoring models  
- Reputation decay  
- Cross‑ecosystem contribution bridges  

---

## 15. Status

This specification is in Alpha and subject to change as the protocol evolves.
