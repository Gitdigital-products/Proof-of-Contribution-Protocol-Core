# 📚 Protocol Glossary

## Proof‑of‑Contribution Protocol Core
Version: 0.1.0  
Status: Public (Alpha)

---

### 🎯 Purpose

This glossary defines all canonical terms used throughout the Proof‑of‑Contribution Protocol Core.  
#### It ensures:

- Shared understanding  
- Deterministic interpretation  
- Governance clarity  
- Audit readiness  
- Cross‑language consistency  

Every term in this document is normative unless otherwise noted.

---

### A

#### Action
A contributor‑initiated behavior that results in a contribution event.  
Examples: code commit, documentation update, governance vote.

#### Aggregator (Score Aggregator)
The deterministic component that sums integer scores from all applicable scoring rules.

---

### C

#### Canonical Event
A structured JSON object representing a contributor action.  
Must include: event_id, type, timestamp, payload, metadata.

#### Conditions (Rule Conditions)
Deterministic checks that determine whether a scoring rule applies to an event.

#### Conformance
The degree to which an implementation matches the reference protocol behavior exactly.

#### Contribution Event
The atomic unit of work in the protocol.  
Represents a single contributor action.

#### Contribution Proof
The final output of the protocol pipeline, containing:  
- Event  
- Validation result  
- Score result  
- Protocol version  
- Optional signature  

#### Cross‑Language Consistency
The requirement that all implementations (JS, Python, Rust, etc.) produce identical outputs for identical inputs.

---

### D

#### Determinism
The guarantee that the same input always produces the same output.  
No randomness. No external state. No environment‑dependent behavior.

#### Documentation Update
A contribution type representing improvements to documentation.

---

### E

#### Edge Case
A boundary condition that must be tested to ensure deterministic behavior.

#### Event Intake Layer
The first stage of the protocol pipeline.  
Performs schema validation and timestamp sanity checks.

---

### F

#### Fixture
A canonical JSON file used for deterministic testing and conformance validation.

---

### G

#### Governance
The process by which protocol changes are proposed, reviewed, approved, and versioned.

#### Governance Vote
A contribution type representing participation in governance decisions.

---

### I

#### Integrator
Any system that constructs events, runs validation/scoring, or consumes proofs.

#### Intake Error
A deterministic error produced by the event intake layer.

---

### J

#### JSON Canonicalization
The requirement that JSON structures be serialized consistently across implementations.

---

### L

#### Lifecycle
The full sequence from contributor action → event → validation → scoring → proof.

---

### M

#### Metadata
Optional contextual information included in an event.  
Must not affect determinism.

#### Minor Version
A version bump that introduces new rules or validators without breaking existing behavior.

---

### P

#### Payload
The structured data associated with an event.  
Must be validated by payload validators.

#### Proof Generator
The component that produces the final contribution proof.

#### Pure Function
A function with no side effects and deterministic output.

---

### R

#### Replay Protection
A validator that prevents duplicate or regressive events.

#### Rule Evaluator
The component that determines which scoring rules apply to an event.

#### Rule Version
The semantic version of a scoring rule.

---

### S

#### Scoring Engine
The deterministic component that evaluates rules and produces integer scores.

#### Scoring Rule
A deterministic, versioned rule that assigns an integer score to an event.

#### Semantic Versioning
The versioning system used by the protocol:  
MAJOR.MINOR.PATCH.

#### Signature (Optional)
A cryptographic signature attached to a proof.  
Must not affect determinism.

---

### T

#### Test Suite (Conformance)
The official set of fixtures and tests required for protocol compliance.

####:Threat Model
The document describing security assumptions, risks, and mitigations.

#### Timestamp Sanity Check
A deterministic check ensuring timestamps are valid and reasonable.

#### Type Validator
A validator that ensures the event type is recognized.

---

### V

#### Validation Pipeline
The deterministic sequence of validators applied to an event.

#### Validator
A deterministic, stateless, versioned function that checks event correctness.

#### Version Pinning
The requirement that integrators specify exact versions of rules, validators, and protocol.

---

## ✔️ Status

This glossary is now ready for:

- Documentation site  
- Specification  
- Governance RFCs  
- Audit packages  
- Integrator onboarding  
