

1. Audit Logging
· All attestations logged immutably
· Failed attempts logged with reasons
· Access patterns monitored

2. Production Implementation (Node.js)

```javascript
// index.js - Main application
const { createNodeMiddleware, createWebhookEvent } = require('@octokit/webhooks');
const { App } = require('@octokit/app');
const { sign } = require('tweetnacl');
const db = require('./db');
const config = require('./config');

class PowOracle {
 constructor() {
     this.app = new App({
         appId: process.env.APP_ID,
         privateKey: process.env.PRIVATE_KEY,
         webhooks: {
             secret: process.env.WEBHOOK_SECRET
         }
     });
     
     this.webhooks = this.app.webhooks;
     this.setupEventHandlers();
     this.attestationKey = this.loadSigningKey();
 }
 
 async handlePullRequest(event) {
     const { repository, pull_request } = event.payload;
     
     // Validate event
     if (!pull_request.merged) return;
     
     // Check against pow.yaml
     const powConfig = await this.fetchPowConfig(repository);
     const milestones = this.findRelevantMilestones(powConfig, 'pull_request');
     
     for (const milestone of milestones) {
         if (await this.checkMilestone(repository, milestone)) {
             await this.emitAttestation(repository, milestone);
         }
     }
 }
 
 async checkMilestone(repo, milestone) {
     // Use database transaction for idempotency
     return await db.transaction(async (tx) => {
         // Check if already completed
         const completed = await tx.milestones.findOne({
             where: {
                 repo: repo.full_name,
                 milestone_id: milestone.id,
                 completed: true
             }
         });
         
         if (completed) return false;
         
         // Evaluate conditions
         const evidence = {};
         let allMet = true;
         
         for (const condition of milestone.conditions) {
             const [met, proof] = await this.evaluateCondition(
                 repo, condition, tx
             );
             
             if (!met) {
                 allMet = false;
                 break;
             }
             
             evidence[condition.type] = proof;
         }
         
         if (allMet) {
             // Lock and record completion
             await tx.milestones.create({
                 repo: repo.full_name,
                 milestone_id: milestone.id,
                 evidence: JSON.stringify(evidence),
                 completed: true,
                 completed_at: new Date()
             });
             
             return true;
         }
         
         return false;
     });
 }
 
 async emitAttestation(repo, milestone, evidence) {
     const attestation = {
         version: '1.0',
         issuer: process.env.ISSUER_ID,
         repository: repo.full_name,
         milestone_id: milestone.id,
         evidence: evidence,
         timestamp: Date.now(),
         nonce: this.generateNonce(repo, milestone, evidence)
     };
     
     // Create canonical JSON
     const canonical = this.canonicalize(attestation);
     const message = new TextEncoder().encode(canonical);
     
     // Sign with Ed25519
     const signature = sign.detached(message, this.attestationKey.secretKey);
     
     const signedAttestation = {
         ...attestation,
         signature: Buffer.from(signature).toString('base64'),
         public_key: Buffer.from(this.attestationKey.publicKey).toString('base64')
     };
     
     // Broadcast to configured endpoints
     await this.broadcastAttestation(signedAttestation);
     
     // Optional: Post as GitHub comment
     await this.postVerificationComment(repo, milestone, signedAttestation);
     
     return signedAttestation;
 }
 
 async broadcastAttestation(attestation) {
     // Send to Solana program
     if (process.env.SOLANA_RPC_URL) {
         await this.sendToSolana(attestation);
     }
     
     // Send to webhook endpoints
     for (const endpoint of config.broadcastEndpoints) {
         await fetch(endpoint, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(attestation)
         });
     }
 }
 
 async sendToSolana(attestation) {
     // Solana program interaction
     const connection = new Connection(process.env.SOLANA_RPC_URL);
     const programId = new PublicKey(process.env.PROGRAM_ID);
     
     const instruction = new TransactionInstruction({
         keys: [
             { pubkey: attestationPubkey, isSigner: false, isWritable: true },
             { pubkey: issuerPubkey, isSigner: true, isWritable: false }
         ],
         programId: programId,
         data: this.encodeAttestation(attestation)
     });
     
     // Submit transaction
     // ... implementation details
 }
}

// Database schema (PostgreSQL)
/*
CREATE TABLE milestones (
 id SERIAL PRIMARY KEY,
 repo_owner VARCHAR(100) NOT NULL,
 repo_name VARCHAR(100) NOT NULL,
 milestone_id VARCHAR(100) NOT NULL,
 evidence JSONB NOT NULL,
 completed BOOLEAN DEFAULT FALSE,
 completed_at TIMESTAMP WITH TIME ZONE,
 attestation_signature TEXT,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 UNIQUE(repo_owner, repo_name, milestone_id)
);

CREATE INDEX idx_milestones_repo ON milestones(repo_owner, repo_name);
CREATE INDEX idx_milestones_completed ON milestones(completed);
*/
