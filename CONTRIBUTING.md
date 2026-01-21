# Contributing with Proof-of-Work

## Contributor Journey

### 1. Find a Bounty
1. Check `pow.yaml` for available bounties
2. Note the difficulty and reward
3. Ensure bounty hasn't expired

### 2. Solve the Puzzle
```bash
# Example solution script
node scripts/solve-pow.js --difficulty 4
```

3. Submit Your Solution

4. Fork this repository
5. Create a new branch: pow-submission-<bounty-id>
6. Add your solution in a PR with:
   · Nonce that solves the puzzle
   · Your Solana wallet address
   · Label: pow-submission

7. Automated Validation

· GitHub Actions validates your PoW
· GitHub App verifies authenticity
· On success: automatic Solana payout

5. Receive Payout

· Payouts are sent to provided wallet
· Typically within 24 hours of validation
· Transaction visible on Solana explorer

Example Submission Format

Create a PR with this comment:

```
## PoW Submission

**Bounty:** cpu-puzzle-001
**Nonce:** 1234567890
**Wallet:** YourSolanaWalletAddressHere
**Hash:** 0000abc123... (optional proof)
```

```

### 6. `.github/apps/pow-validator/index.js`
```javascript
// Mock GitHub App handler
module.exports = async (req, res) => {
  // This would be a real GitHub App endpoint
  // Verifying installation, checking permissions, validating payloads
  
  const { action, pull_request, repository } = req.body;
  
  if (action === 'labeled' && pull_request.labels.some(l => l.name === 'pow-submission')) {
    // Trigger validation workflow
    console.log('PoW submission detected, triggering validation...');
    
    // In reality: dispatch workflow, create check run, update status
    return res.status(200).json({ triggered: true });
  }
  
  res.status(200).end();
};
```

Contributor Journey: First Commit to Wallet Payout

Phase 1: Discovery & Setup (1-5 minutes)

1. Find Repository: Contributor discovers repo with PoW bounties
2. Read Documentation: Reviews CONTRIBUTING.md and pow.yaml
3. Fork & Clone: Creates personal copy of repository

Phase 2: Solution Development (Variable)

1. Understand Puzzle: Reads bounty requirements in pow.yaml
2. Write Solver: Creates script to find valid nonce:
   ```javascript
   // Example solver
   let nonce = 0;
   while (!hash.startsWith('0000')) {
     nonce++;
     hash = sha256('solana-pow-' + nonce);
   }
   ```
3. Find Solution: Runs solver until condition met

Phase 3: Submission (2 minutes)

1. Create Branch: git checkout -b pow-cpu-puzzle-001
2. Open PR: Creates pull request with:
   · Nonce value
   · Wallet address
   · pow-submission label
3. Trigger Validation: PR creation triggers GitHub Actions

Phase 4: Automated Validation (~1 minute)

1. GitHub Actions: Runs validate-pow.yml
2. PoW Check: Validates hash meets difficulty
3. GitHub App: Verifies submission authenticity
4. Status Update: Adds ✅ to PR if valid

Phase 5: Payout Processing (~5 minutes simulated)

1. Trigger Payout: Validation success triggers payout script
2. Wallet Check: Verifies provided Solana address
3. Transaction Creation: Builds Solana transfer
4. Sign & Send: Treasury signs and sends SOL
5. Confirmation: Waits for blockchain confirmation
6. Status Update: Comments transaction link on PR

Phase 6: Completion (Instant)

1. Funds Received: Contributor sees SOL in wallet
2. Verification: Can verify transaction on Solana explorer
3. Repository Update: Payment ledger updated (in production)

Reproducible Local Test

```bash
# 1. Clone the repository
git clone https://github.com/your-org/pow-bounty-example.git
cd pow-bounty-example

# 2. Install dependencies
npm install @solana/web3.js

# 3. Test PoW validation
node scripts/validate-pow.js --submission test --bounty-id cpu-puzzle-001

# 4. Simulate payout
PR_NUMBER=123 node scripts/simulate-payout.js \
  --pr 123 \
  --contributor "alice" \
  --amount 0.1

# 5. Run GitHub Actions simulation
act -j validate-pow --eventpath .github/workflows/test-pr.json
```

Production Considerations

1. Security:
   · Treasury keys in hardware security module
   · GitHub App with minimal permissions
   · Rate limiting and anti-sybil measures
2. Scalability:
   · Queue system for payout processing
   · Database for payment tracking
   · Monitoring and alerts
3. Compliance:
   · KYC/AML for larger payouts
   · Tax documentation
   · Jurisdiction considerations

This example demonstrates a complete, realistic flow while remaining minimal enough for easy understanding and adaptation. The actual implementation would require proper security measures, error handling, and production infrastructure.

