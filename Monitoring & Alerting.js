9. Monitoring & Alerting

```javascript
// health.js - Production monitoring
class HealthMonitor {
    async checkHealth() {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            metrics: {
                webhooks_processed: await this.getWebhookCount(),
                attestations_issued: await this.getAttestationCount(),
                avg_processing_time: await this.getAvgProcessingTime(),
                errors_last_hour: await this.getErrorCount()
            },
            dependencies: {
                database: await this.checkDatabase(),
                github_api: await this.checkGitHubAPI(),
                signing_key: await this.checkSigningKey()
            }
        };
    }
    
    async checkDeterministicIntegrity() {
        // Periodically verify that completed milestones
        // would produce the same attestation if re-evaluated
        const milestones = await db.getRecentMilestones();
        
        for (const milestone of milestones) {
            const reEvaluation = await this.reEvaluateMilestone(milestone);
            if (reEvaluation.signature !== milestone.attestation_signature) {
                // Alert: Non-deterministic evaluation detected
                await this.alertSecurityTeam(milestone);
            }
        }
    }
}
