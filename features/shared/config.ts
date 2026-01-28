export const IS_DEMO = !process.env.ETHERSCAN_API_KEY;

export const walletAddress = process.env
  .NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`;

export const usdcContract = process.env.USDC_CONTRACT_ADDRESS as `0x${string}`;

export const tokenHash = process.env.TOKEN_HASH;
