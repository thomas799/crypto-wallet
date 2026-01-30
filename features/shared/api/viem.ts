import 'server-only';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

const rpcUrl = 'https://rpc.sepolia.org';

export const publicClient = createPublicClient({
  chain: sepolia,
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
      chain: sepolia,
      transport: http(rpcUrl)
    })
  : undefined;
