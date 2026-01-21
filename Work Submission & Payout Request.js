// Miner submits proof-of-work
const workProof = await generateWorkProof(challenge, nonce);
const payoutAmount = calculateReward(workProof);

// Protocol verifies work, then checks KYC
const tx = await program.methods
    .verifyPayoutEligibility(payoutAmount)
    .accounts({
        worker: minerWallet,
        attestation: attestationPda,
        eligibility: eligibilityPda,
        config: configPda,
        clock: SYSVAR_CLOCK_PUBKEY,
    })
    .rpc();
