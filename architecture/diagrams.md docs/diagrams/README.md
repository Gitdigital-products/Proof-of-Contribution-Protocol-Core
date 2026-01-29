# architecture/diagrams.md
docs/diagrams/
README.md
`



---

## 🏗️ Architecture Diagram (Mermaid)

### Proof‑of‑Contribution Protocol Core

`mermaid
flowchart TD

    subgraph Integrators["External Integrators"]
        A1["Apps"]
        A2["Bots"]
        A3["Automation Pipelines"]
        A4["Solana Programs"]
    end

    A1 --> B
    A2 --> B
    A3 --> B
    A4 --> B

    subgraph Intake["Event Intake Layer"]
        B["Schema Validation<br/>Timestamp Checks"]
    end

    B --> C

    subgraph Validation["Validation Pipeline"]
        C["Type Validator"]
        C --> D["Payload Validator"]
        D --> E["Replay Validator"]
        E --> F["Rule‑Specific Validators"]
    end

    F --> G

    subgraph Scoring["Scoring Engine"]
        G["Rule Evaluation<br/>Deterministic Scoring"]
    end

    G --> H

    subgraph Proof["Contribution Proof Layer"]
        H["Proof Assembly<br/>Optional Signature"]
    end

    H --> I

    subgraph Output["Output / Integrators"]
        I["Storage<br/>Rewards<br/>Governance<br/>Analytics"]
    end
`

---

### 🧩 Why This Diagram Matters

###### This diagram:

- Shows the entire deterministic pipeline  
- Matches the spec, architecture, and integration guide  
- Highlights trust boundaries  
- Makes onboarding dramatically easier  
- Gives auditors a clear mental model  
- Fits perfectly into GitDigital’s ecosystem aesthetic  

It’s the kind of diagram that instantly communicates:  
“This is a real protocol.”
