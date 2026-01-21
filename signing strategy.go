# Attestation Signing Strategy

```go
// AttestationSigner - Creates signed attestations
package attestation

import (
    "crypto/ed25519"
    "crypto/sha256"
    "encoding/base64"
    "encoding/json"
    "time"
)

type Attestation struct {
    Version     string                 `json:"version"`
    Issuer      string                 `json:"issuer"`
    Repository  string                 `json:"repository"`
    MilestoneID string                 `json:"milestone_id"`
    Evidence    map[string]interface{} `json:"evidence"`
    Timestamp   int64                  `json:"timestamp"`
    Nonce       string                 `json:"nonce"`
}

type Signer struct {
    privateKey ed25519.PrivateKey
    publicKey  ed25519.PublicKey
    issuerID   string
}

func (s *Signer) CreateAttestation(
    repo, milestoneID string,
    evidence map[string]interface{},
) (*SignedAttestation, error) {
    
    // Create deterministic attestation
    attestation := &Attestation{
        Version:     "1.0",
        Issuer:      s.issuerID,
        Repository:  repo,
        MilestoneID: milestoneID,
        Evidence:    evidence,
        Timestamp:   time.Now().Unix(),
        Nonce:       generateNonce(repo, milestoneID, evidence),
    }
    
    // Create canonical JSON
    canonical, err := s.canonicalize(attestation)
    if err != nil {
        return nil, err
    }
    
    // Sign
    signature := ed25519.Sign(s.privateKey, canonical)
    
    return &SignedAttestation{
        Attestation: attestation,
        Signature:   base64.StdEncoding.EncodeToString(signature),
        PublicKey:   base64.StdEncoding.EncodeToString(s.publicKey),
    }, nil
}

// Deterministic canonicalization
func (s *Signer) canonicalize(a *Attestation) ([]byte, error) {
    // Sort keys and use deterministic JSON encoding
    type canonicalAttestation struct {
        V string                 `json:"version"`
        I string                 `json:"issuer"`
        R string                 `json:"repository"`
        M string                 `json:"milestone_id"`
        E map[string]interface{} `json:"evidence"`
        T int64                  `json:"timestamp"`
        N string                 `json:"nonce"`
    }
    
    canonical := canonicalAttestation{
        V: a.Version,
        I: a.Issuer,
        R: a.Repository,
        M: a.MilestoneID,
        E: a.Evidence,
        T: a.Timestamp,
        N: a.Nonce,
    }
    
    return json.Marshal(canonical)
}
