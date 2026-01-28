'use server';

import { erc20Abi, parseUnits } from 'viem';

import type { TransactionResult } from './types';

import {
  publicClient,
  usdcAddress,
  walletAddress as viemWalletAddress,
  walletClient
} from '../../lib/viem-client';

const IS_DEMO = !process.env.ETHERSCAN_API_KEY;

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

    if (!usdcAddress) {
      return {
        error: 'USDC_CONTRACT_ADDRESS is not set in environment variables',
        success: false
      };
    }

    if (!viemWalletAddress) {
      return {
        error: 'NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables',
        success: false
      };
    }

    const parsedAmount = parseUnits(amount, 6);

    const { request } = await publicClient.simulateContract({
      abi: erc20Abi,
      account: walletClient.account,
      address: usdcAddress,
      args: [viemWalletAddress, parsedAmount],
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

    if (!usdcAddress) {
      return {
        error: 'USDC_CONTRACT_ADDRESS is not set in environment variables',
        success: false
      };
    }

    const parsedAmount = parseUnits(amount, 6);

    const { request } = await publicClient.simulateContract({
      abi: erc20Abi,
      account: walletClient.account,
      address: usdcAddress,
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
