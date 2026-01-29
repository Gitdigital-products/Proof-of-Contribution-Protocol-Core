# 📝 RFC‑0001: New Scoring Rule — documentationupdatebase
Category: Scoring  
Status: Draft  
Author: @contributor  
Created: 2026‑01‑27  
Updated: 2026‑01‑27  
Protocol Version Impacted: 0.1.x

---

## 1. Summary

This RFC proposes a new scoring rule, documentationupdatebase, which awards a small, deterministic score for contribution events of type documentation_update.  
The rule ensures documentation work is recognized consistently across the ecosystem.

---

## 2. Motivation

Documentation updates are essential for ecosystem health but are currently unscored.  
This creates an imbalance where code‑centric contributions receive recognition while documentation work does not.

### Motivations:

- Encourage high‑quality documentation  
- Reward non‑code contributors  
- Improve ecosystem accessibility  
- Align with GitDigital’s contributor‑friendly philosophy  

This rule introduces a minimal, deterministic score for documentation updates.

---

## 3. Proposal

### Add a new scoring rule:

- Name: documentationupdatebase  
- Applies to: documentation_update events  
- Score: 2  
- Version: 0.1.0  
- Notes: “Base score for documentation updates.”  

This rule is intentionally minimal and non‑overlapping.

---

## 4. Specification

### 4.1 Rule Definition (Canonical JSON)

`json
{
  "name": "documentationupdatebase",
  "version": "0.1.0",
  "appliesto": ["documentationupdate"],
  "conditions": {},
  "score": 2,
  "notes": "Base score for documentation updates."
}
`

### 4.2 Deterministic Behavior

- Applies to all events where type === "documentation_update"  
- No payload conditions  
- Always returns a score of 2  
- No branching logic  
- No environment‑dependent behavior  

### 4.3 Rule Evaluation Order

This rule is evaluated after:

- codecommitbase  
- governancevotebase  

…but ordering does not affect determinism because the rule has no conditions.

---

## 5. Rationale

###:Why this design?

- Simple and predictable  
- Encourages documentation work  
- Avoids over‑weighting non‑code contributions  
- Easy to audit  
- Easy to test  
- No overlap with existing rules  

### Why not more complex scoring?

Complexity belongs in future rules (e.g., “major documentation overhaul”).  
This RFC establishes the baseline.

---

## 6. Security Considerations

- No new attack vectors introduced  
- No external state  
- No replay implications  
- No payload parsing  
- No risk of validator bypass  

Documentation updates are low‑risk events.

---

## 7. Backward Compatibility

### This is a non‑breaking change:

- Adds a new rule  
- Does not modify existing rules  
- Does not change protocol semantics  
- Does not affect validation pipeline  

Integrators do not need to migrate.

---

## 8. Alternatives Considered

Alternative 1 — Score = 1
Rejected because it undervalues documentation work.

Alternative 2 — Score = 3
Rejected because it risks overweighting documentation relative to code.

Alternative 3 — Conditional scoring
Rejected because it introduces unnecessary complexity for a baseline rule.

---

## 9. Implementation Plan

### Step 1 — Add rule JSON
Add to:

`
src/scoring/rules/documentationupdatebase.json
`

### Step 2 — Add tests
Under:

`
tests/scoring/documentationupdatebase.test.js
`

## Tests must include:

- Valid event → score 2  
- Invalid type → score 0  
- Edge cases → score 2  

### Step 3 — Update documentation
- Scoring rules page  
- Changelog  
- Versioning notes  

### Step 4 — Release
- Bump MINOR version  
- Publish release notes  

---

## 10. Reference Implementation (JavaScript)

`js
export const documentationupdatebase = {
  name: "documentationupdatebase",
  version: "0.1.0",
  appliesto: ["documentationupdate"],
  conditions: {},
  score: 2,
  notes: "Base score for documentation updates."
};
`

---

## 11. Open Questions

- Should future rules differentiate between minor and major documentation updates?  
- Should documentation updates require payload validation?  

---

## 12. Changelog

- 2026‑01‑27: Initial draft  
