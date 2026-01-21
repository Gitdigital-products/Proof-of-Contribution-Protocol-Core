// Fee calculation is public and verifiable
pub fn calculate_fees(amount: u64) -> (u64, u64, u64) {
    // Platform fee: 2%
    let platform_fee = amount * PLATFORM_FEE_BASIS_POINTS as u64 / BASIS_POINTS_DIVISOR as u64;
    
    // Treasury fee: 1% 
    let treasury_fee = amount * TREASURY_FEE_BASIS_POINTS as u64 / BASIS_POINTS_DIVISOR as u64;
    
    // Contributor gets remainder: 97%
    let contributor_amount = amount - platform_fee - treasury_fee;
    
    (contributor_amount, platform_fee, treasury_fee)
}
