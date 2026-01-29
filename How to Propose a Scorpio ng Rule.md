# 🎯 How to Propose a Scoring Rule

## Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Contributor Guide (Alpha)

---

### 📘 Purpose

This guide explains how contributors can propose new scoring rules or modify existing ones in the Proof‑of‑Contribution Protocol Core.

#### Scoring rules are core protocol logic.  
They must be:

- Deterministic  
- Versioned  
- Auditable  
- Governance‑approved  
- Backward‑compatible (unless explicitly breaking)  

This guide ensures every proposal meets those standards.

---

#### 1. When You Should Propose a Scoring Rule

You should propose a new scoring rule when:

- A new contribution type is added  
- An existing contribution type needs more nuance  
- A rule needs adjustment for fairness or clarity  
- A rule is ambiguous or incomplete  
- A rule is missing for a common ecosystem action  

##### You should not propose a rule when:

- The change is purely stylistic  
- It duplicates an existing rule  
- It introduces nondeterminism  
- It depends on external state or APIs  

---

#### 2. Requirements for Any Scoring Rule

Every scoring rule must be:

##### 2.1 Deterministic
No randomness.  
No environment‑dependent behavior.  
No floating‑point math.

##### 2.2 Pure
Given the same event, the rule must always produce the same score.

##### 2.3 Versioned
Every rule has a semantic version:

`
0.1.0
`

##### 2.4 Minimal
Rules should be simple and composable.

##### 2.5 Documented
Every rule must include:

- Name  
- Version  
- Applies to  
- Conditions  
- Score  
- Notes  

##### 2.6 Testable
Rules must include:

- Unit tests  
- Condition tests  
- Edge case tests  

---

#### 3. Steps to Propose a Scoring Rule

##### Step 1 — Open an Issue

Create an issue titled:

`
RFC: New Scoring Rule — <rule_name>
`

Include:

- Motivation  
- Example events  
- Expected score  
- Why existing rules are insufficient  

---

##### Step 2 — Draft an RFC

Use the official RFC template:

`
governance/rfc-template.md
`

Your RFC must include:

- Motivation  
- Specification  
- Rule definition  
- Rationale  
- Security considerations  
- Backward compatibility  
- Alternatives considered  

---

##### Step 3 — Define the Rule (JSON Format)

Example:

`json
{
  "name": "example_rule",
  "version": "0.1.0",
  "appliesto": ["exampletype"],
  "conditions": {
    "field": "value"
  },
  "score": 4,
  "notes": "Example rule for demonstration."
}
`

---

##### Step 4 — Add Tests

Add tests under:

`
tests/scoring/
`

Tests must include:

- Valid event  
- Invalid event  
- Edge cases  
- Condition boundaries  

---

##### Step 5 — Submit a Pull Request

Your PR must include:

- RFC link  
- Rule definition  
- Tests  
- Changelog entry  
- Version bump (if required)  

---

##### Step 6 — Maintainer Review

At least two maintainers must approve.

They will check:

- Determinism  
- Spec alignment  
- Security  
- Backward compatibility  
- Test coverage  

---

##### Step 7 — Governance Approval (If Required)

Governance approval is required for:

- Breaking changes  
- Major scoring rule changes  
- New contribution categories  

---

##### Step 8 — Merge & Release

Once approved:

- Rule is merged  
- Version is bumped  
- Release notes are published  
- Docs are updated  

---

#### 4. Example: A Well‑Formed Scoring Rule Proposal

Motivation
Community moderators contribute significantly but are not currently scored.

Proposed Rule
`json
{
  "name": "moderation_action",
  "version": "0.1.0",
  "applies_to": ["moderation"],
  "conditions": {
    "action": "resolved"
  },
  "score": 4,
  "notes": "Score for resolving moderation actions."
}
`

Tests
- Resolving a report → score 4  
- Ignoring a report → score 0  
- Invalid payload → validation fails  

Governance
Minor change → no governance vote required.

---

#### 5. Common Mistakes to Avoid

- Using floating‑point numbers  
- Adding rules without tests  
- Forgetting version bumps  
- Introducing nondeterministic conditions  
- Overlapping rule semantics  
- Adding rules without RFCs  
- Using ambiguous conditions  

---

## ✔️ Status

This guide is now ready for contributors and maintainers.
