'use server';

import { erc20Abi, parseUnits } from 'viem';

import type { TransactionResult } from './types';

import { publicClient, walletClient } from '../shared/api/viem';
import { IS_DEMO, usdcContract, walletAddress } from '../shared/config';

export async function deposit(
  amount: string,
  _fromAddress: string
): Promise<TransactionResult> {
  if (IS_DEMO) {
    return {
      hash: `0xdemo${Date.now().toString(16)}${'0'.repeat(40)}`,
      success: true
    };
  }

  try {
    if (!walletClient) {
      return {
        error: 'Wallet not configured (missing private key)',
        success: false
      };
    }

    if (!usdcContract) {
      return {
        error: 'USDC_CONTRACT_ADDRESS is not set in environment variables',
        success: false
      };
    }

    if (!walletAddress) {
      return {
        error: 'NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables',
        success: false
      };
    }

    const parsedAmount = parseUnits(amount, 6);

    // Note: In a real application, deposit would require user's wallet connection (MetaMask/WalletConnect)
    // For demo purposes, this performs a self-transfer to demonstrate the transaction flow
    const { request } = await publicClient.simulateContract({
      abi: erc20Abi,
      account: walletClient.account,
      address: usdcContract,
      args: [walletAddress, parsedAmount],
      functionName: 'transfer'
    });

    const hash = await walletClient.writeContract(request);

    return { hash, success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Deposit failed';
    return { error: message, success: false };
  }
}

export async function withdraw(
  amount: string,
  toAddress: string
): Promise<TransactionResult> {
  if (IS_DEMO) {
    return {
      hash: `0xdemo${Date.now().toString(16)}${'0'.repeat(40)}`,
      success: true
    };
  }

  try {
    if (!walletClient) {
      return {
        error: 'Wallet not configured (missing private key)',
        success: false
      };
    }

    if (!usdcContract) {
      return {
        error: 'USDC_CONTRACT_ADDRESS is not set in environment variables',
        success: false
      };
    }

    const parsedAmount = parseUnits(amount, 6);

    const { request } = await publicClient.simulateContract({
      abi: erc20Abi,
      account: walletClient.account,
      address: usdcContract,
      args: [toAddress as `0x${string}`, parsedAmount],
      functionName: 'transfer'
    });

    const hash = await walletClient.writeContract(request);

    return { hash, success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Withdrawal failed';
    return { error: message, success: false };
  }
}
