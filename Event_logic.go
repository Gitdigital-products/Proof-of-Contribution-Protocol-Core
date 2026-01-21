Event Validation Logic:

```go
// Go implementation - EventValidator
package validator

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "errors"
    "strings"
    "time"
)

type EventValidator struct {
    webhookSecret string
    allowedRepos  map[string]bool
}

func (v *EventValidator) ValidateWebhook(payload []byte, signature string) error {
    // Verify GitHub signature
    mac := hmac.New(sha256.New, []byte(v.webhookSecret))
    mac.Write(payload)
    expectedMAC := "sha256=" + hex.EncodeToString(mac.Sum(nil))
    
    if !hmac.Equal([]byte(signature), []byte(expectedMAC)) {
        return errors.New("invalid webhook signature")
    }
    
    // Additional validation
    if time.Since(event.Timestamp) > 5*time.Minute {
        return errors.New("event too old")
    }
    
    return nil
}
