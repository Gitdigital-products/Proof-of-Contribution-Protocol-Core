Repository Structure


pow-protocol-core/
├── src/
│   ├── schema/
│   │   ├── pow-schema.json          # JSON Schema for pow.yaml
│   │   ├── types.ts                # TypeScript type definitions
│   │   └── validation.ts           # Custom validation rules
│   ├── examples/
│   │   ├── simple-project/
│   │   │   └── pow.yaml
│   │   ├── multi-milestone/
│   │   │   └── pow.yaml
│   │   └── complex-splits/
│   │       └── pow.yaml
│   ├── attestation/
│   │   ├── proof-aggregator.ts     # Aggregates off-chain proofs
│   │   ├── merkle-tree.ts          # Merkle tree construction
│   │   └── attestation-generator.ts # On-chain attestation creation
│   ├── verifier/
│   │   ├── proof-verifier.ts       # Verifies off-chain proofs
│   │   └── criteria-checker.ts     # Checks acceptance criteria
│   └── utils/
│       ├── hash.ts                 # Cryptographic utilities
│       └── deterministic-parser.ts # Deterministic YAML parser
├── tests/
│   ├── validation.test.ts
│   ├── attestation.test.ts
│   └── integration.test.ts
├── contracts/
│   └── AttestationRegistry.sol     # Sample smart contract interface
└── README.md
