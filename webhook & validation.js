2. Webhook Events & Validation

Required Webhooks:

```javascript
// Event subscriptions
const WEBHOOK_EVENTS = [
  'pull_request.closed',        // PR merges
  'push',                       // Commits & tags
  'create',                     // Tag creation
  'check_suite.completed',      // CI suite completion
  'check_run.completed',        // Individual CI runs
  'status'                      // Commit status
];
