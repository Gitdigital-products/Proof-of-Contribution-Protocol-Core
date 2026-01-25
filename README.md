# 📘README Rewrite 

Below is a polished, trust‑building README that positions the protocol as a serious, open‑source standard.

---

Proof‑of‑Contribution Protocol Core
A deterministic, schema‑driven protocol for describing, validating, and attesting to contributions across any project or ecosystem.

Why This Exists
Modern ecosystems rely on contributions — code, research, governance, design, community work — but lack a unified, verifiable way to describe them.  
This protocol solves that.

What It Provides
- A canonical schema (pow.yaml)  
- A deterministic validation engine  
- Strongly‑typed TypeScript definitions  
- Integration guides and examples  
- Governance‑ready documentation  

Use Cases
- Reward distribution  
- Contribution indexing  
- Compliance workflows  
- Contributor dashboards  
- DAO governance  

Quick Start
`bash
npm install @gitdigital/poc-protocol-core
`

`ts
import { validate } from "@gitdigital/poc-protocol-core";
const result = validate("pow.yaml");
`

Documentation
See /docs/ for full protocol specification, architecture, examples, and governance.

---
# Proof-of-Contribution Protocol Core

The **Proof-of-Contribution Protocol Core** defines a structured, machine-verifiable way to describe and validate “proof of work” (PoW) style contribution records. It provides a canonical JSON Schema, TypeScript types, and validation utilities for `pow.yaml` files that can be embedded into contributor workflows, automation pipelines, and governance systems.

This repository is designed as a **standards-first core**: opinionated enough to be interoperable across tools, but flexible enough to be embedded into different ecosystems (bounties, grants, DAOs, reputation systems, and more).

---

## Goals

- **Standardize contribution metadata:** Provide a single, well-defined schema for `pow.yaml` files.
- **Enable automated validation:** Make it easy for tools and CI pipelines to validate contribution proofs.
- **Support typed integrations:** Offer TypeScript types for strongly-typed applications and SDKs.
- **Be composable:** Act as a core protocol that other products, services, and governance frameworks can build on.

---

## Repository structure

```text
pow-protocol-core/
├── src/
│   ├── schema/
│   │   ├── pow-schema.json   # JSON Schema for pow.yaml
│   │   ├── types.ts          # TypeScript type definitions
│   │   └── validation.ts     # Custom validation rules
│   └── ...
├── examples/
│   ├── simple-project/
│   │   └── pow.yaml          # Example PoW definition for a simple project
├── POW-schema.json           # Top-level schema reference (mirror/entrypoint)
├── Directory.md
├── LICENSE
└── README.md
