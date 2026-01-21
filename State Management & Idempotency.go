# State Management & Idempotency

```go
// StateManager - Ensures idempotent processing
package state

import (
    "context"
    "database/sql"
    "encoding/json"
    "time"
)

type StateManager struct {
    db *sql.DB
}

func (sm *StateManager) TryLockMilestone(
    repoOwner, repoName, milestoneID string,
    evidence map[string]interface{},
) (bool, error) {
    
    tx, err := sm.db.BeginTx(context.Background(), &sql.TxOptions{
        Isolation: sql.LevelSerializable,
        ReadOnly:  false,
    })
    if err != nil {
        return false, err
    }
    defer tx.Rollback()
    
    // Check if already completed
    var completedAt sql.NullTime
    err = tx.QueryRow(`
        SELECT completed_at 
        FROM milestones 
        WHERE repo_owner = $1 AND repo_name = $2 
        AND milestone_id = $3
        FOR UPDATE
    `, repoOwner, repoName, milestoneID).Scan(&completedAt)
    
    if completedAt.Valid {
        return false, nil // Already completed
    }
    
    // Insert with lock
    evidenceJSON, _ := json.Marshal(evidence)
    _, err = tx.Exec(`
        INSERT INTO milestones 
        (repo_owner, repo_name, milestone_id, evidence, locked_at)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT DO NOTHING
    `, repoOwner, repoName, milestoneID, evidenceJSON, time.Now())
    
    if err != nil {
        return false, err
    }
    
    return tx.Commit() == nil, nil
}
