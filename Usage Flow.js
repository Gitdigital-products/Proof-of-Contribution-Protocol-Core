// Frontend pseudocode
1. Platform admin initializes payout config
2. Contributor completes KYC (off-chain, attested on-chain)
3. Admin creates milestone with contributor & verifier
4. Admin funds the vault
5. Contributor completes work
6. Verifier signs off-chain attestation
7. Anyone can submit attestation + signature to trigger payout
8. Program verifies and executes split payments atomically
9. Event emitted with full fee transparency
