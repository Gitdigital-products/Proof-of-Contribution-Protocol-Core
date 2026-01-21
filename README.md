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
