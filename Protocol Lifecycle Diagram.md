# 🔄 Protocol Lifecycle Diagram

## Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Draft (Alpha)

---

### 🎯 Purpose

This document provides a complete, high‑level lifecycle diagram for the Proof‑of‑Contribution Protocol.  
It illustrates the deterministic flow of data from event creation to proof generation, ensuring:

- Transparency  
- Auditability  
- Developer comprehension  
- Governance clarity  
- Integration consistency  

This is the “big picture” view of the entire protocol.

---

### 1. Protocol Lifecycle — High‑Level Diagram

`mermaid
flowchart TD
    A[Contributor Action] --> B[Event Creation]
    B --> C[Event Intake Layer]
    C --> D[Validation Pipeline]
    D --> E{Valid?}

    E -- No --> F[Reject Event]
    F --> G[Return Validation Error]

    E -- Yes --> H[Scoring Engine]
    H --> I[Rule Evaluation]
    I --> J[Score Aggregation]
    J --> K[Score Result]

    K --> L[Proof Generator]
    L --> M[Contribution Proof]

    M --> N[Integrator / Storage / Rewards / Governance]
`

---

### 2. Stage Breakdown

#### 2.1 Contributor Action
A contributor performs an action:

- Code commit  
- Documentation update  
- Governance vote  
- Community support  
- Moderation action  
- Any ecosystem‑defined contribution  

This action is captured as a structured event.

---

#### 2.2 Event Creation
The integrator or client system constructs a canonical event:

- event_id  
- type  
- timestamp  
- payload  
- metadata  

Events must follow the protocol schema.

---

#### 2.3 Event Intake Layer
The intake layer performs:

- Schema validation  
- Timestamp sanity checks  
- Basic structural checks  

This ensures malformed events never reach the validator pipeline.

---

#### 2.4 Validation Pipeline
The event flows through deterministic validators:

1. Type Validator  
2. Payload Validator  
3. Replay Validator  
4. Rule‑Specific Validators  

##### Each validator is:

- Stateless  
- Pure  
- Deterministic  
- Versioned  

If any validator fails, the event is rejected.

---

#### 2.5 Scoring Engine
If validation succeeds, the event enters the scoring engine.

##### The engine:

- Identifies applicable rules  
- Evaluates rule conditions  
- Computes integer scores  
- Aggregates results deterministically  

No floating‑point math.  
No randomness.  
No external state.

---

#### 2.6 Proof Generator
The proof generator combines:

- Event  
- Validation result  
- Score result  
- Protocol version  
- Optional signature  

The output is a Contribution Proof — a deterministic, verifiable artifact.

---

#### 2.7 Integrator / Storage / Rewards / Governance
Downstream systems may:

- Store proofs  
- Trigger rewards  
- Update contributor reputation  
- Feed governance dashboards  
- Perform audits  
- Sync with other GitDigital systems  

The protocol does not dictate downstream behavior — it only guarantees correctness.

---

### 3. End‑to‑End Lifecycle Summary

| Stage | Purpose | Determinism Guarantee |
|-------|---------|------------------------|
| Contributor Action | Real‑world contribution | Outside protocol scope |
| Event Creation | Canonical event structure | Schema‑enforced |
| Intake Layer | Basic structural validation | Pure checks |
| Validation Pipeline | Security + correctness | Stateless validators |
| Scoring Engine | Deterministic scoring | Fixed rule order |
| Proof Generator | Verifiable output | Versioned format |
| Integrator Layer | Ecosystem‑specific | Outside protocol scope |

---

### 4. Mermaid Sequence Diagram (Lifecycle View)

`mermaid
sequenceDiagram
    autonumber

    participant Contributor
    participant Integrator
    participant Intake
    participant Validation
    participant Scoring
    participant Proof
    participant Downstream

    Contributor->>Integrator: Perform Action
    Integrator->>Intake: Create Event
    Intake->>Validation: Pass Event
    Validation->>Integrator: Validation Result
    Integrator->>Scoring: Submit Validated Event
    Scoring->>Integrator: Score Result
    Integrator->>Proof: Submit Event + Score
    Proof->>Downstream: Contribution Proof
`

---

## ✔️ Status

This lifecycle diagram is now ready for:

- Architecture docs  
- Docusaurus site  
- Governance RFCs  
- Audit packages  
- Integrator onboarding  
