# 🎯 Scoring Rules Specification

## Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Draft (Alpha)

---

### 📘 Purpose

This document defines the deterministic scoring rules used by the Proof‑of‑Contribution Protocol Core.  
It ensures that:

- All implementations compute identical scores  
- Scoring logic is transparent and auditable  
- Rules are versioned and governance‑controlled  
- Integrators can extend rules without breaking the core  

This specification is required for audits, governance reviews, and cross‑ecosystem interoperability.

---

#### 1. Design Principles

#### Scoring rules must follow these - principles:

-- Deterministic
No randomness, no external state, no environment‑dependent behavior.

-- Minimal
Only essential rules are included in the core.

-- Composable
Rules can be extended by integrators without modifying the core.

-- Transparent
Every rule must be documented, versioned, and testable.

-- Auditable
Given the same event, all implementations must produce the same score.

---

#### 2. Scoring Rule Structure

Each scoring rule has:

- Name  
- Version  
- Description  
- Contribution types  
- Conditions  
- Score value  
- Notes  

##### Rule Format

`json
{
  "name": "string",
  "version": "semver",
  "appliesto": ["contributiontype"],
  "conditions": {},
  "score": 0,
  "notes": "string"
}
`

---

#### 3. Core Scoring Rules (v0.1.0)

These rules define the baseline scoring model for the protocol.

---

##### 3.1 Code Contribution Rules

###### Rule: codecommitbase

`json
{
  "name": "codecommitbase",
  "version": "0.1.0",
  "appliesto": ["codecommit"],
  "conditions": {},
  "score": 5,
  "notes": "Base score for any valid code commit event."
}
`

---

###### Rule: pullrequestmerged

`json
{
  "name": "pullrequestmerged",
  "version": "0.1.0",
  "appliesto": ["pullrequest"],
  "conditions": {
    "merged": true
  },
  "score": 8,
  "notes": "Higher score for merged PRs."
}
`

---

###### Rule: code_review

`json
{
  "name": "code_review",
  "version": "0.1.0",
  "appliesto": ["codereview"],
  "conditions": {},
  "score": 3,
  "notes": "Score for reviewing another contributor's code."
}
`

---

#### 3.2 Documentation Contribution Rules

###### Rule: documentation_update

`json
{
  "name": "documentation_update",
  "version": "0.1.0",
  "applies_to": ["documentation"],
  "conditions": {},
  "score": 3,
  "notes": "Score for updating or adding documentation."
}
`

---

###### Rule: spec_update

`json
{
  "name": "spec_update",
  "version": "0.1.0",
  "appliesto": ["specupdate"],
  "conditions": {},
  "score": 6,
  "notes": "Higher score for modifying protocol specifications."
}
`

---

#### 3.3 Governance Contribution Rules

###### Rule: governance_vote

`json
{
  "name": "governance_vote",
  "version": "0.1.0",
  "appliesto": ["governancevote"],
  "conditions": {},
  "score": 10,
  "notes": "Score for participating in governance voting."
}
`

---

###### Rule: rfc_submission

`json
{
  "name": "rfc_submission",
  "version": "0.1.0",
  "appliesto": ["rfcsubmission"],
  "conditions": {},
  "score": 12,
  "notes": "Score for submitting a formal RFC."
}
`

---

#### 3.4 Community Contribution Rules

###### Rule: community_support

`json
{
  "name": "community_support",
  "version": "0.1.0",
  "appliesto": ["communitysupport"],
  "conditions": {},
  "score": 2,
  "notes": "Score for answering questions or helping community members."
}
`

---

###### Rule: event_hosting

`json
{
  "name": "event_hosting",
  "version": "0.1.0",
  "appliesto": ["eventhosting"],
  "conditions": {},
  "score": 7,
  "notes": "Score for hosting community events or workshops."
}
`

---

#### 4. Rule Evaluation Order

Rules must be evaluated in the following order:

1. Type‑specific rules  
2. Condition‑specific rules  
3. Fallback rules  

If multiple rules apply, scores are summed.

---

#### 5. Versioning Requirements

##### Each rule must include:

- A semantic version  
- A changelog entry  
- A governance approval (for major changes)  

Breaking changes require:

- RFC submission  
- Maintainer review  
- Governance approval  

---

#### 6. Extending Scoring Rules

##### Integrators may add custom rules:

- As long as they remain deterministic  
- As long as they do not override core rules  
- As long as they are versioned  

Custom rules must be placed in:

`
/spec/extensions/
`

---

#### 7. Testing Requirements

###### Each rule must have:

- Unit tests  
- Condition tests  
- Edge case tests  
- Version compatibility tests  

---

#### 8. Status

This scoring rule specification is in Alpha and will expand as the protocol matures.

# 🟦 examples/javascript/basic.js

```js
// Basic JavaScript Example Implementation
// Proof-of-Contribution Protocol Core

// 1. Validate Event
function validateEvent(event) {
  const errors = [];

  if (!event.id) errors.push("missing_field:id");
  if (!event.timestamp) errors.push("missing_field:timestamp");
  if (!event.actor) errors.push("missing_field:actor");
  if (!event.type) errors.push("missing_field:type");
  if (!event.payload) errors.push("missing_field:payload");

  return {
    event_id: event.id || null,
    valid: errors.length === 0,
    errors,
    validator: "js-core",
    version: "0.1.0"
  };
}

// 2. Score Event
function scoreEvent(event) {
  let score = 0;
  const rules = [];

  if (event.type === "code_commit") {
    score += 5;
    rules.push("codecommitbase");
  }

  if (event.type === "documentation") {
    score += 3;
    rules.push("documentation_update");
  }

  return {
    event_id: event.id,
    score,
    rules_applied: rules,
    version: "0.1.0"
  };
}

// 3. Generate Proof
function generateProof(event, validation, score) {
  return {
    event_id: event.id,
    score: score.score,
    validated: validation.valid,
    signature: null,
    version: "0.1.0"
  };
}

// Example Usage
const event = {
  id: "evt_123",
  timestamp: 1738000000,
  actor: "Fh29...abc",
  type: "code_commit",
const proof = generateProof(event, validation, scoring);

console.log(proof);
```




🟧 examples/python/basic.py

```python

Basic Python Example Implementation

Proof-of-Contribution Protocol Core

def validate_event(event):
    errors = []

    required = ["id", "timestamp", "actor", "type", "payload"]
    for field in required:
        if field not in event:            errors.append(f"missing_field:{field}")

    return {
        "event_id": event.get("id"),
        "valid": len(errors) == 0,
        "errors": errors,
        "validator": "python-core",
        "version": "0.1.0"
    }


def score_event(event):
    score = 0
    rules = []

    if event["type"] == "code_commit":
        score += 5
        rules.append("codecommitbase")

    if event["type"] == "documentation":
        score += 3        rules.append("documentation_update")

    return {        "event_id": event["id"],
        "score": score,
        "rules_applied": rules,
        "version": "0.1.0"
    }


def generate_proof(event, validation, score):
    return {
        "event_id": event["id"],
        "score": score["score"],
        "validated": validation["valid"],
        "signature": None,
        "version": "0.1.0"
    }


Example Usage
event = {
    "id": "evt_123",
    "timestamp": 1738000000,
    return {
        "event_id": event["id"],
        "score": score,
        "rules_applied": rules,
        "version": "0.1.0"
    }


def generate_proof(event, validation, score):
    return {
        "event_id": event["id"],
        "score": score["score"],
        "validated": validation["valid"],
        "signature": None,
        "version": "0.1.0"
    }


Example Usage
event = {
    "id": "evt_123",
    "timestamp": 1738000000,
    "actor": "Fh29...abc",
    "type": "code_commit",
    "payload": {"repo": "example/repo"}
}

validation = validate_event(event)
scoring = score_event(event)
proof = generate_proof(event, validation, scoring)

print(proof)
```

---

🦀 examples/rust/basic.rs

```rust
// Basic Rust Example Implementation
// Proof-of-Contribution Protocol Core

use serde::{Deserialize, Serialize};

[derive(Serialize, Deserialize)]
struct Event {
    id: String,
    timestamp: u64,
    actor: String,
    r#type: String,
    payload: serde_json::Value,
}

[derive(Serialize)]
struct ValidationResult {
    event_id: String,
    valid: bool,
    errors: Vec<String>,
    validator: String,
    version: String,
}

fn validate_event(event: &Event) -> ValidationResult {
    let mut errors = Vec::new();

    if event.id.isempty() { errors.push("missingfield:id".into()); }
    if event.actor.isempty() { errors.push("missingfield:actor".into()); }
    if event.r#type.isempty() { errors.push("missingfield:type".into()); }

    ValidationResult {
        event_id: event.id.clone(),
        valid: errors.is_empty(),
        errors,
        validator: "rust-core".into(),
        version: "0.1.0".into(),
    }
}

[derive(Serialize)]
struct ScoreResult {
    event_id: String,
    score: u32,
    rules_applied: Vec<String>,
    version: String,
}

fn score_event(event: &Event) -> ScoreResult {
    let mut score = 0;
    let mut rules = Vec::new();

    match event.r#type.as_str() {
        "code_commit" => {
            score += 5;
            rules.push("codecommitbase".into());
        }
        "documentation" => {
            score += 3;
            rules.push("documentation_update".into());
        }
        _ => {}
    }

    ScoreResult {
        event_id: event.id.clone(),
        score,
        rules_applied: rules,
        version: "0.1.0".into(),
    }
}

- As long as they are versioned  

Custom rules must be placed in:


/spec/extensions/
```


7. Testing Requirements

Each rule must have:

- Unit tests  
- Condition tests  
- Edge case tests  
- Version compatibility tests  


8. Status

This scoring rule specification is in Alpha and will expand as the protocol matures.



# 🟦 examples/javascript/basic.js

```js
// Basic JavaScript Example Implementation
// Proof-of-Contribution Protocol Core

// 1. Validate Event
function validateEvent(event) {
  const errors = [];

  if (!event.id) errors.push("missing_field:id");
  if (!event.timestamp) errors.push("missing_field:timestamp");
  if (!event.actor) errors.push("missing_field:actor");
  if (!event.type) errors.push("missing_field:type");
  if (!event.payload) errors.push("missing_field:payload");

  return {
    event_id: event.id || null,
    valid: errors.length === 0,
    errors,
    validator: "js-core",
    version: "0.1.0"
  };
}

// 2. Score Event
function scoreEvent(event) {
  let score = 0;
  const rules = [];

  if (event.type === "code_commit") {
    score += 5;
    rules.push("codecommitbase");
  }

  if (event.type === "documentation") {
    score += 3;
    rules.push("documentation_update");
  }

  return {
    event_id: event.id,
    score,
    rules_applied: rules,
    version: "0.1.0"
  };
}

// 3. Generate Proof
function generateProof(event, validation, score) {
  return {
    event_id: event.id,
    score: score.score,
    validated: validation.valid,
    signature: null,
    version: "0.1.0"
  };
}

// Example Usage
const event = {
  id: "evt_123",
  timestamp: 1738000000,
  actor: "Fh29...abc",
  type: "code_commit",
const validation = validateEvent(event);
const scoring = scoreEvent(event);
const proof = generateProof(event, validation, scoring);

console.log(proof);


````



🟧 examples/python/basic.py

```python

Basic Python Example Implementation

Proof-of-Contribution Protocol Core

def validate_event(event):
    errors = []

    required = ["id", "timestamp", "actor", "type", "payload"]
    for field in required:        if field not in event:
            errors.append(f"missing_field:{field}")

    return {
        "event_id": event.get("id"),
        "valid": len(errors) == 0,
        "errors": errors,
        "validator": "python-core",
        "version": "0.1.0"
    }


def score_event(event):
    score = 0
    rules = []

    if event["type"] == "code_commit":
        score += 5
        rules.append("codecommitbase")
    if event["type"] == "documentation":
        score += 3
        rules.append("documentation_update")

    return {
        "event_id": event["id"],
        "score": score,
        "rules_applied": rules,
        "version": "0.1.0"
    }


def generate_proof(event, validation, score):
    return {
        "event_id": event["id"],
        "score": score["score"],
        "validated": validation["valid"],
        "signature": None,
    for field in required:
        if field not in event:
            errors.append(f"missing_field:{field}")

    return {
        "event_id": event.get("id"),
        "valid": len(errors) == 0,
        "errors": errors,
        "validator": "python-core",
        "version": "0.1.0"
    }


def score_event(event):
    score = 0
    rules = []

    if event["type"] == "code_commit":
        score += 5
        rules.append("codecommitbase")

    if event["type"] == "documentation":
        score += 3
        rules.append("documentation_update")

    return {
        "event_id": event["id"],
        "score": score,
        "rules_applied": rules,
        "version": "0.1.0"
    }


def generate_proof(event, validation, score):
    return {
        "event_id": event["id"],
        "score": score["score"],
        "validated": validation["valid"],
        "signature": None,
        "version": "0.1.0"
    }


Example Usage
event = {
    "id": "evt_123",
    "timestamp": 1738000000,
    "actor": "Fh29...abc",
    "type": "code_commit",
scoring = score_event(event)
proof = generate_proof(event, validation, scoring)

print(proof)

````

# 🦀 examples/rust/basic.rs

```rust
// Basic Rust Example Implementation
// Proof-of-Contribution Protocol Core

use serde::{Deserialize, Serialize};

[derive(Serialize, Deserialize)]
struct Event {
    id: String,
    timestamp: u64,
    actor: String,
    r#type: String,
    payload: serde_json::Value,
}

[derive(Serialize)]
struct ValidationResult {
    event_id: String,
    valid: bool,
    errors: Vec<String>,
    validator: String,
    version: String,
}

fn validate_event(event: &Event) -> ValidationResult {
    let mut errors = Vec::new();

    if event.id.isempty() { errors.push("missingfield:id".into()); }
    if event.actor.isempty() { errors.push("missingfield:actor".into()); }
    if event.r#type.isempty() { errors.push("missingfield:type".into()); }

    ValidationResult {
        event_id: event.id.clone(),
        valid: errors.is_empty(),
        errors,
        validator: "rust-core".into(),        version: "0.1.0".into(),
    }
}

[derive(Serialize)]
struct ScoreResult {
    event_id: String,
    score: u32,
    rules_applied: Vec<String>,
    version: String,
}

fn score_event(event: &Event) -> ScoreResult {
    let mut score = 0;
    let mut rules = Vec::new();

    match event.r#type.as_str() {
        "code_commit" => {
            score += 5;
            rules.push("codecommitbase".into());
#### This structure now includes:
        validator: "rust-core".into(),
        version: "0.1.0".into(),
    }
}

[derive(Serialize)]
struct ScoreResult {
    event_id: String,
    score: u32,
    rules_applied: Vec<String>,
    version: String,
}

fn score_event(event: &Event) -> ScoreResult {
    let mut score = 0;
    let mut rules = Vec::new();

    match event.r#type.as_str() {
        "code_commit" => {
            score += 5;
            rules.push("codecommitbase".into());
        }
        "documentation" => {
            score += 3;
            rules.push("documentation_update".into());
        }
        _ => {}
    }

    ScoreResult {
        event_id: event.id.clone(),
        score,
        rules_applied: rules,
        version: "0.1.0".into(),
    }
}

[derive(Serialize)]
struct Proof {
    event_id: String,
    score: u32,
    validated: bool,
    signature: Option<String>,
    version: String,
}

fn generate_proof(event: &Event, validation: &ValidationResult, score: &ScoreResult) -> Proof {
    Proof {
        event_id: event.id.clone(),
        score: score.score,
        validated: validation.valid,
        signature: None,
        version: "0.1.0".into(),
    }
}
```



