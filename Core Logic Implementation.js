pub mod milestone_payouts {
    use super::*;
    
    pub fn initialize_payout_config(
        ctx: Context<InitializePayoutConfig>,
    ) -> Result<()> {
        let payout_config = &mut ctx.accounts.payout_config;
        
        payout_config.authority = ctx.accounts.authority.key();
        payout_config.treasury = ctx.accounts.treasury.key();
        payout_config.platform_owner = ctx.accounts.platform_owner.key();
        payout_config.mint = ctx.accounts.mint.key();
        payout_config.kyc_authority = ctx.accounts.kyc_authority.key();
        payout_config.total_funded = 0;
        payout_config.total_paid_out = 0;
        payout_config.is_active = true;
        payout_config.bump = ctx.bumps.payout_config;
        
        Ok(())
    }
    
    pub fn process_milestone_payout(
        ctx: Context<ProcessMilestonePayout>,
        attestation_data: Vec<u8>,
        signature: [u8; 64],
    ) -> Result<()> {
        let milestone = &mut ctx.accounts.milestone;
        let payout_config = &mut ctx.accounts.payout_config;
        let nonce = &mut ctx.accounts.attestation_nonce;
        
        // 1. Verify off-chain attestation signature
        let verifier_key = milestone.verifier;
        let message = Self::construct_attestation_message(
            &milestone.key(),
            &attestation_data,
            nonce.nonce
        );
        
        require!(
            Self::verify_ed25519_signature(&verifier_key, &message, &signature),
            ErrorCode::InvalidSignature
        );
        
        // 2. Verify KYC (already done via account constraints)
        
        // 3. Calculate payout amounts
        let milestone_amount = milestone.amount - milestone.amount_paid;
        
        let platform_fee = milestone_amount
            .checked_mul(PLATFORM_FEE_BASIS_POINTS as u64)
            .unwrap()
            .checked_div(BASIS_POINTS_DIVISOR as u64)
            .unwrap();
        
        let treasury_fee = milestone_amount
            .checked_mul(TREASURY_FEE_BASIS_POINTS as u64)
            .unwrap()
            .checked_div(BASIS_POINTS_DIVISOR as u64)
            .unwrap();
        
        let contributor_amount = milestone_amount
            .checked_sub(platform_fee)
            .unwrap()
            .checked_sub(treasury_fee)
            .unwrap();
        
        // 4. Execute atomic transfers
        // Transfer to contributor
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.funding_vault.to_account_info(),
                    to: ctx.accounts.contributor_token_account.to_account_info(),
                    authority: payout_config.to_account_info(),
                },
            ),
            contributor_amount,
        )?;
        
        // Transfer to treasury
        if treasury_fee > 0 {
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.funding_vault.to_account_info(),
                        to: ctx.accounts.treasury_token_account.to_account_info(),
                        authority: payout_config.to_account_info(),
                    },
                ),
                treasury_fee,
            )?;
        }
        
        // Transfer to platform owner
        if platform_fee > 0 {
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.funding_vault.to_account_info(),
                        to: ctx.accounts.platform_token_account.to_account_info(),
                        authority: payout_config.to_account_info(),
                    },
                ),
                platform_fee,
            )?;
        }
        
        // 5. Update state
        milestone.amount_paid = milestone.amount;
        milestone.is_completed = true;
        milestone.attestation_count = milestone.attestation_count.checked_add(1).unwrap();
        
        payout_config.total_paid_out = payout_config.total_paid_out
            .checked_add(milestone_amount)
            .unwrap();
        
        nonce.nonce = nonce.nonce.checked_add(1).unwrap();
        
        emit!(MilestonePaid {
            milestone: milestone.key(),
            contributor: milestone.contributor,
            amount: milestone_amount,
            platform_fee,
            treasury_fee,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    // Helper function for signature verification
    fn verify_ed25519_signature(
        pubkey: &Pubkey,
        message: &[u8],
        signature: &[u8; 64],
    ) -> bool {
        use ed25519_dalek::{PublicKey, Signature, Verifier};
        
        let public_key = match PublicKey::from_bytes(pubkey.as_ref()) {
            Ok(pk) => pk,
            Err(_) => return false,
        };
        
        let sig = match Signature::from_bytes(signature) {
            Ok(s) => s,
            Err(_) => return false,
        };
        
        public_key.verify(message, &sig).is_ok()
    }
    
    fn construct_attestation_message(
        milestone_key: &Pubkey,
        attestation_data: &[u8],
        nonce: u32,
    ) -> Vec<u8> {
        let mut message = Vec::new();
        message.extend_from_slice(b"milestone_attestation");
        message.extend_from_slice(milestone_key.as_ref());
        message.extend_from_slice(attestation_data);
        message.extend_from_slice(&nonce.to_le_bytes());
        message
    }
}

// Events
#[event]
pub struct MilestonePaid {
    pub milestone: Pubkey,
    pub contributor: Pubkey,
    pub amount: u64,
    pub platform_fee: u64,
    pub treasury_fee: u64,
    pub timestamp: i64,
}
