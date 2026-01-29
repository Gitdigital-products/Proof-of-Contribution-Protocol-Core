# 📝 RFC‑0002: New Validator — moderationpayloadvalidator
Category: Validation  
Status: Draft  
Author: @contributor  
Created: 2026‑01‑27  
Updated: 2026‑01‑27  
Protocol Version Impacted: 0.1.x

---

## 1. Summary

This RFC proposes a new validator, moderationpayloadvalidator, which ensures that events of type moderation contain a valid action field.  
The validator enforces structural correctness and prevents malformed moderation events from entering the protocol pipeline.

---

## 2. Motivation

Moderation events are increasingly common in community‑driven ecosystems.  
However, the protocol currently lacks structural validation for these events, which creates risks:

- Malformed moderation events could pass validation  
- Scoring rules may be applied incorrectly  
- Integrators may receive inconsistent or incomplete data  
- Attackers could craft malformed events to bypass scoring or inflate reputation  

This validator ensures moderation events are structurally sound before scoring.

---

## 3. Proposal

### Add a new validator:

- Name: moderationpayloadvalidator  
- Applies to: moderation events  
- Required field: payload.action  
- Allowed values: resolved, escalated  
- Version: 0.1.0  

This validator is minimal, deterministic, and aligned with the protocol’s threat model.

---

## 4. Specification

### 4.1 Validator Definition (Canonical JSON)

`json
{
  "name": "moderationpayloadvalidator",
  "version": "0.1.0",
  "conditions": {
    "type": "moderation"
  },
  "errors": {
    "missing_field": "payload.action is required",
    "invalid_value": "payload.action must be one of: resolved, escalated"
  },
  "notes": "Ensures moderation events contain required fields."
}
`

### 4.2 Deterministic Behavior

- Applies only when event.type === "moderation"  
- Fails if payload.action is missing  
- Fails if payload.action is not one of the allowed values  
- Produces deterministic error messages  
- No branching logic beyond simple equality checks  
- No environment‑dependent behavior  

---

## 5. Rationale

### Why this design?

- Simple and predictable  
- Enforces structural correctness  
- Prevents malformed moderation events  
- Aligns with the protocol’s minimal validator philosophy  
- Easy to test and audit  

### Why not validate more fields?

Moderation events may evolve.  
This validator establishes the baseline without over‑specifying future behavior.

---

## 6. Security Considerations

This validator strengthens the protocol by:

- Preventing malformed moderation events  
- Reducing attack surface for replay or injection attacks  
- Ensuring scoring rules cannot be manipulated via malformed payloads  

No new attack vectors are introduced.

---

## 7. Backward Compatibility

### This is a non‑breaking change:

- Adds a new validator  
- Does not modify existing validators  
- Does not change protocol semantics  
- Does not affect scoring rules  

### Integrators do not need to migrate.

---

## 8. Alternatives Considered

Alternative 1 — Allow any action value
Rejected because it weakens structural guarantees.

Alternative 2 — Add multiple moderation validators
Rejected because it introduces unnecessary complexity for a baseline rule.

Alternative 3 — Validate additional fields
Rejected for now; may be added in future RFCs.

---

## 9. Implementation Plan

### Step 1 — Add validator JSON
Add to:

`
src/validators/moderationpayloadvalidator.json
`

### Step 2 — Add tests
Under:

`
tests/validators/moderationpayloadvalidator.test.js
`

Tests must include:

- Missing action → error  
- Invalid action → error  
- Valid action → passes  
- Non‑moderation events → ignored  

### Step 3 — Update documentation
- Validation pipeline docs  
- Validator registry  
- Changelog  

### Step 4 — Release
- Bump MINOR version  
- Publish release notes  

---

## 10. Reference Implementation (JavaScript)

`js
export const moderationpayloadvalidator = {
  name: "moderationpayloadvalidator",
  version: "0.1.0",
  conditions: { type: "moderation" },
  validate: (event) => {
    if (!event.payload || !event.payload.action) {
      return { valid: false, error: "payload.action is required" };
    }
    if (!["resolved", "escalated"].includes(event.payload.action)) {
      return { valid: false, error: "payload.action must be one of: resolved, escalated" };
    }
    return { valid: true, error: null };
  }
};
`

---

## 11. Open Questions

- Should moderation events include severity levels?  
- Should moderation events require a reason field?  
- Should moderation events be scored differently based on action?  

---

## 12. Changelog

- 2026‑01‑27: Initial draft  
