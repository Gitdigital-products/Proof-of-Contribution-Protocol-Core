3. Milestone Validation Engine

```go
// MilestoneChecker - Deterministic verification
package milestone

import (
    "context"
    "fmt"
    "github.com/google/go-github/v50/github"
    "gopkg.in/yaml.v3"
)

type ConditionEvaluator struct {
    githubClient *github.Client
    repoState    *StateManager
}

func (e *ConditionEvaluator) EvaluateMilestone(
    ctx context.Context,
    repoOwner string,
    repoName string,
    milestoneID string,
) (bool, map[string]interface{}, error) {
    
    // 1. Fetch pow.yaml from default branch
    config, err := e.fetchPowConfig(ctx, repoOwner, repoName)
    if err != nil {
        return false, nil, err
    }
    
    // 2. Find milestone definition
    milestone := config.GetMilestone(milestoneID)
    if milestone == nil {
        return false, nil, fmt.Errorf("milestone not found")
    }
    
    // 3. Evaluate all conditions
    evidence := make(map[string]interface{})
    allConditionsMet := true
    
    for _, condition := range milestone.Conditions {
        met, proof, err := e.evaluateCondition(ctx, repoOwner, repoName, condition)
        if err != nil {
            return false, nil, err
        }
        
        if !met {
            allConditionsMet = false
            break
        }
        
        evidence[condition.Type] = proof
    }
    
    // 4. Check deterministic lock
    if allConditionsMet {
        locked, err := e.repoState.TryLockMilestone(
            repoOwner, repoName, milestoneID, evidence,
        )
        if !locked {
            return false, nil, errors.New("milestone already completed or locked")
        }
    }
    
    return allConditionsMet, evidence, nil
}

func (e *ConditionEvaluator) evaluateCondition(
    ctx context.Context,
    owner, repo string,
    condition Condition,
) (bool, interface{}, error) {
    
    switch condition.Type {
    case "pull_request":
        return e.evaluatePRCondition(ctx, owner, repo, condition)
        
    case "tag":
        return e.evaluateTagCondition(ctx, owner, repo, condition)
        
    case "ci", "check_suite":
        return e.evaluateCICondition(ctx, owner, repo, condition)
        
    default:
        return false, nil, fmt.Errorf("unknown condition type: %s", condition.Type)
    }
}

// PR condition evaluation
func (e *ConditionEvaluator) evaluatePRCondition(
    ctx context.Context,
    owner, repo string,
    condition Condition,
) (bool, []github.PullRequest, error) {
    
    // Fetch PRs with deterministic query
    opts := &github.PullRequestListOptions{
        State: "closed",
        Base:  condition.TargetBranch,
        Sort:  "updated",
        Direction: "desc",
    }
    
    prs, _, err := e.githubClient.PullRequests.List(ctx, owner, repo, opts)
    if err != nil {
        return false, nil, err
    }
    
    // Apply filters
    filtered := e.filterPRs(prs, condition)
    
    // Check count requirement
    meetsCount := len(filtered) >= condition.MinCount
    
    // Check time window if specified
    if condition.WindowHours > 0 {
        meetsCount = e.checkTimeWindow(filtered, condition.WindowHours)
    }
    
    return meetsCount, filtered, nil
}
