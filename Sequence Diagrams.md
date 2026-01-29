# 🔁 Sequence Diagrams

# Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Draft (Alpha)

---

### 1. Validation Pipeline — Sequence Diagram

This diagram shows the exact, deterministic order of operations in the validation pipeline.

`mermaid
sequenceDiagram
    autonumber

    participant Integrator
    participant Intake as Event Intake Layer
    participant TypeV as Type Validator
    participant PayloadV as Payload Validator
    participant ReplayV as Replay Validator
    participant RuleV as Rule-Specific Validators
    participant Output as Validation Result

    Integrator->>Intake: Submit Contribution Event
    Intake->>Intake: Schema Validation
    Intake->>Intake: Timestamp Sanity Check
    Intake->>TypeV: Pass Event
    TypeV->>PayloadV: Validate Type
    PayloadV->>ReplayV: Validate Payload
    ReplayV->>RuleV: Check Replay Protection
    RuleV->>Output: Run Rule-Specific Validators
    Output->>Integrator: Return Validation Result
`

#### Key Guarantees
- Deterministic order  
- Stateless validators  
- No external calls  
- No randomness  
- Pure functional behavior  

---

### 2. Scoring Pipeline — Sequence Diagram

This diagram shows how validated events are scored using deterministic rules.

`mermaid
sequenceDiagram
    autonumber

    participant Integrator
    participant Scoring as Scoring Engine
    participant RuleEval as Rule Evaluator
    participant Sum as Score Aggregator
    participant Output as Score Result

    Integrator->>Scoring: Submit Validated Event
    Scoring->>RuleEval: Identify Applicable Rules
    RuleEval->>RuleEval: Evaluate Rule Conditions
    RuleEval->>Sum: Return Rule Scores
    Sum->>Sum: Sum Deterministically
    Sum->>Output: Produce Score Result
    Output->>Integrator: Return Score
`

#### Key Guarantees
- Rule evaluation order is fixed  
- Scores are pure integers  
- No floating‑point math  
- No environment‑dependent behavior  
- No nondeterministic branching  

---

### 3. End‑to‑End Flow — Combined Diagram

This diagram shows the full lifecycle from event submission to proof generation.

`mermaid
sequenceDiagram
    autonumber

    participant Integrator
    participant Intake as Event Intake
    participant Validation as Validation Pipeline
    participant Scoring as Scoring Engine
    participant Proof as Proof Generator
    participant Output as Contribution Proof

    Integrator->>Intake: Submit Event
    Intake->>Validation: Pass Valid Event
    Validation->>Integrator: Validation Result
    Integrator->>Scoring: Submit Validated Event
    Scoring->>Integrator: Score Result
    Integrator->>Proof: Submit Event + Validation + Score
    Proof->>Output: Generate Contribution Proof
    Output->>Integrator: Return Proof
`

---

## ✔️ Status

These diagrams are now ready for inclusion in:

- architecture/overview.md  
- docs/api-reference.md  
- Docusaurus site  
- Governance RFCs  
- Audit packages  
