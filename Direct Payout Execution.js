// After verification succeeds, execute payout
if (eligibility.compliance_status === 2) {
    const payoutTx = await transferTokens(
        protocolVault,
        minerWallet,
        payoutAmount,
        mintAddress
    );
    
    // Update payout records
    await program.methods
        .recordPayout(payoutAmount)
        .accounts({
            eligibility: eligibilityPda,
            worker: minerWallet,
        })
        .rpc();
}
