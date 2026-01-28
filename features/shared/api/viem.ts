import 'server-only';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const rpcUrl = 'https://eth.llamarpc.com';

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl)
});

const rawKey = process.env.WALLET_PRIVATE_KEY;
const isValidKey = rawKey && /^0x[0-9a-fA-F]{64}$/.test(rawKey);

export const account = isValidKey
  ? privateKeyToAccount(rawKey as `0x${string}`)
  : undefined;

export const walletClient = account
  ? createWalletClient({
      account,
      chain: mainnet,
      transport: http(rpcUrl)
    })
  : undefined;
