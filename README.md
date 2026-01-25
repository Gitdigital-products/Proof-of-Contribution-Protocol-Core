![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-purple)
![Maintained](https://img.shields.io/badge/maintained-yes-success)

![Validate](https://img.shields.io/github/actions/workflow/status/Gitdigital-products/solana-compliance-registry/validate.yml?label=validate)
![Index](https://img.shields.io/github/actions/workflow/status/Gitdigital-products/solana-compliance-registry/generate-index.yml?label=generate-index)
![Build](https://img.shields.io/github/actions/workflow/status/Gitdigital-products/solana-compliance-registry/build.yml?label=build)
![Release](https://img.shields.io/github/actions/workflow/status/Gitdigital-products/solana-compliance-registry/release.yml?label=release)

![Providers](https://img.shields.io/badge/providers-20%2B-blue)
![Policies](https://img.shields.io/badge/policies-10%2B-green)
![Schema](https://img.shields.io/badge/schema-validated-orange)
![Registry](https://img.shields.io/badge/registry-auto--generated-lightgrey)

![JS SDK](https://img.shields.io/badge/sdk-js-yellow)
![Python SDK](https://img.shields.io/badge/sdk-python-blue)
![Rust SDK](https://img.shields.io/badge/sdk-rust-orange)

![Docs](https://img.shields.io/badge/docs-complete-brightgreen)
![Wiki](https://img.shields.io/badge/wiki-available-blue)
![Architecture](https://img.shields.io/badge/architecture-documented-purple)
![Governance](https://img.shields.io/badge/governance-open--community-blueviolet)
![Security](https://img.shields.io/badge/security-responsible--disclosure-red)
![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen)

![Solana](https://img.shields.io/badge/built_for-Solana-4E44CE)
![Compliance](https://img.shields.io/badge/compliance-registry-important)
![Open Source](https://img.shields.io/badge/open--source-yes-success)

<p align="center">

  <!-- Project -->
  <img src="https://img.shields.io/badge/status-active-brightgreen" />
  <img src="https://img.shields.io/badge/version-v1.0.0-blue" />
  <img src="https://img.shields.io/badge/license-MIT-purple" />
  <img src="https://img.shields.io/badge/maintained-yes-success" />

  <!-- Registry -->
  <img src="https://img.shields.io/badge/providers-20%2B-blue" />
  <img src="https://img.shields.io/badge/policies-10%2B-green" />
  <img src="https://img.shields.io/badge/schema-validated-orange" />
  <img src="https://img.shields.io/badge/registry-auto--generated-lightgrey" />

  <!-- SDKs -->
  <img src="https://img.shields.io/badge/sdk-js-yellow" />
  <img src="https://img.shields.io/badge/sdk-python-blue" />
  <img src="https://img.shields.io/badge/sdk-rust-orange" />

  <!-- Docs -->
  <img src="https://img.shields.io/badge/docs-complete-brightgreen" />
  <img src="https://img.shields.io/badge/wiki-available-blue" />
  <img src="https://img.shields.io/badge/architecture-documented-purple" />

  <!-- Governance -->
  <img src="https://img.shields.io/badge/governance-open--community-blueviolet" />
  <img src="https://img.shields.io/badge/security-responsible--disclosure-red" />
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen" />

  <!-- Ecosystem -->
  <img src="https://img.shields.io/badge/built_for-Solana-4E44CE" />
  <img src="https://img.shields.io/badge/compliance-registry-important" />
  <img src="https://img.shields.io/badge/open--source-yes-success" />

</p>



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
