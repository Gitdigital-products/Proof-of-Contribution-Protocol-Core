// User completes off-chain KYC with provider
// Provider issues on-chain attestation
const tx = await program.methods
    .issueAttestation(2, [85, 83], null) // Level 2, US, default expiry
    .accounts({
        wallet: userWallet,
        kycProvider: kycProvider.publicKey,
        attestation: attestationPda,
        systemProgram: SystemProgram.programId,
    })
    .signers([kycProvider])
    .rpc();
