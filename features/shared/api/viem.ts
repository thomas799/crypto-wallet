import 'server-only';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

const rpcUrl = 'https://ethereum-sepolia-rpc.publicnode.com';

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl, {
    timeout: 30_000
  })
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
      transport: http(rpcUrl, {
        timeout: 30_000
      })
    })
  : undefined;
