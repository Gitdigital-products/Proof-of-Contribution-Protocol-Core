6. Security Considerations

Critical Security Measures:

1. Webhook Validation
   · Verify GitHub signatures
   · Replay attack prevention (timestamp checks)
   · Rate limiting per repository
2. Access Control
   · Repository whitelisting
   · Installation token scoping (read-only except comments)
   · Principle of least privilege
3. Secret Management
   · Private key in hardware security module (HSM) or vault
   · GitHub App credentials encrypted at rest
   · Key rotation policy (90 days)
4. Deterministic Guarantees
   ```go
   // Deterministic proof generation
   func generateProofID(evidence map[string]interface{}) string {
       // Sort keys, canonical JSON, then hash
       canonical, _ := json.Marshal(sortKeys(evidence))
       hash := sha256.Sum256(canonical)
       return hex.EncodeToString(hash[:])
   }
