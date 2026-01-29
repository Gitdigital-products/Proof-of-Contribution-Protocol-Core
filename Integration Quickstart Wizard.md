# ⚡ Integration Quickstart Wizard

## Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Public (Alpha)

---

### 🎯 Purpose

This Quickstart Wizard walks integrators through the minimum viable steps required to:

1. Construct a canonical event  
2. Validate it  
3. Score it  
4. Generate a contribution proof  

#### It is intentionally:

- Deterministic  
- Minimal  
- Copy‑paste‑ready  
- Language‑agnostic  
- Auditor‑friendly  

This is the fastest way to integrate the protocol.

---

### 1. Step Zero — Pin Your Versions

#### Before writing any code, pin:

- Protocol version  
- Validator versions  
- Scoring rule versions  

#### Example:

`
protocol: 0.1.0
validators:
  - type_validator: 0.1.0
  - payload_validator: 0.1.0
  - replay_validator: 0.1.0
rules:
  - codecommitbase: 0.1.0
  - documentationupdatebase: 0.1.0
`

Version pinning is required for determinism.

---

### 2. Step One — Create a Canonical Event

#### Construct a minimal event:

`json
{
  "eventid": "evt001",
  "type": "code_commit",
  "timestamp": "2026-01-27T12:34:56Z",
  "payload": {
    "lines_added": 42,
    "lines_deleted": 3
  },
  "metadata": {
    "repo": "example/repo",
    "branch": "main"
  }
}
`

#### Rules:

- Must be valid JSON  
- Must include all required fields  
- Timestamp must be ISO‑8601  
- Payload must match type requirements  

---

### 3. Step Two — Run the Validation Pipeline

#### The validation pipeline runs in deterministic order:

1. Type Validator  
2. Payload Validator  
3. Replay Validator  
4. Rule‑Specific Validators  

#### Expected output:

`json
{
  "valid": true,
  "errors": [],
  "version": "0.1.0"
}
`

#### If validation fails:

- Do not score the event  
- Do not generate a proof  
- Return the deterministic error message  

---

### 4. Step Three — Score the Event

Once validated, pass the event to the scoring engine.

#### The engine:

- Identifies applicable rules  
- Evaluates conditions  
- Aggregates integer scores  

#### Expected output:

`json
{
  "score": 5,
  "rulesapplied": ["codecommit_base"],
  "version": "0.1.0"
}
`

#### Scoring must be:

- Pure  
- Deterministic  
- Integer‑only  
- Version‑pinned  

---

### 5. Step Four — Generate a Contribution Proof

#### Combine:

- Event  
- Validation result  
- Score result  
- Protocol version  
- Optional signature  

#### Example:

`json
{
  "event": { "...": "..." },
  "validated": true,
  "score": 5,
  "rulesapplied": ["codecommit_base"],
  "version": "0.1.0",
  "signature": null
}
`

This is the artifact integrators store, index, or use for rewards.

---

### 6. Step Five — Run the Conformance Tests

#### Before claiming compliance, run:

- Schema tests  
- Validation tests  
- Scoring tests  
- Proof tests  
- Cross‑language tests  

Your implementation must match the reference outputs byte‑for‑byte.

---

### 7. Step Six — Document Your Integration

#### Integrators must document:

- Event creation strategy  
- Replay protection strategy  
- Timestamp handling  
- Version pinning  
- Storage of proofs  

This ensures auditability.

---

### 8. Step Seven — Apply for Certification

#### To be certified:

- All Quickstart steps must pass  
- All conformance tests must pass  
- All outputs must match reference implementations  
- No nondeterministic behavior may exist  

#### Certification is granted by:

- GitDigital maintainers  
- Governance committee (for major integrators)  

---

### 9. Quickstart Summary

| Step | Action | Output |
|------|--------|--------|
| 1 | Pin versions | Deterministic environment |
| 2 | Create event | Canonical event |
| 3 | Validate | Validation result |
| 4 | Score | Score result |
| 5 | Generate proof | Contribution proof |
| 6 | Run conformance tests | Compliance |
| 7 | Document integration | Audit readiness |
| 8 | Certification | Official compliance |

---

## ✔️ Status

The Integration Quickstart Wizard is now ready for:

- Documentation site  
- Integrator onboarding  
- Partner engineering  
- Audit packages  
- Developer workshops  
