'use server';

import { format } from 'date-fns';
import { formatUnits } from 'viem';

import type { WalletData } from './types';

import {
  getEthBalance,
  getEthPrice,
  getTokenTransfers,
  getTransactionList,
  getUsdcBalance
} from '../shared/api/etherscan';
import { IS_DEMO, walletAddress } from '../shared/config';
import { DEMO_WALLET_DATA } from './config';
import { calculateDailyChange } from './utils';

export async function getWalletData(): Promise<WalletData> {
  if (IS_DEMO) return DEMO_WALLET_DATA;

  if (!walletAddress) {
    throw new Error(
      'NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables'
    );
  }

  const [
    usdcResult,
    ethBalanceResult,
    ethPriceResult,
    txListResult,
    transfersResult
  ] = await Promise.allSettled([
    getUsdcBalance(),
    getEthBalance(),
    getEthPrice(),
    getTransactionList(walletAddress, 'asc', '1', '1'),
    getTokenTransfers(walletAddress)
  ]);

  const usdcRaw = usdcResult.status === 'fulfilled' ? usdcResult.value : '0';
  const ethBalanceWei =
    ethBalanceResult.status === 'fulfilled' ? ethBalanceResult.value : '0';
  const ethPriceData =
    ethPriceResult.status === 'fulfilled' ? ethPriceResult.value : null;
  const firstTxList =
    txListResult.status === 'fulfilled' ? txListResult.value : [];
  const tokenTransfers =
    transfersResult.status === 'fulfilled' ? transfersResult.value : [];

  const usdcBalance = Number(formatUnits(BigInt(usdcRaw || '0'), 6));
  const ethBalance = Number(formatUnits(BigInt(ethBalanceWei || '0'), 18));
  const ethPrice = Number(ethPriceData?.ethusd ?? 0);

  const portfolioValueUsd = ethBalance * ethPrice;
  const usdcPlusPortfolio = usdcBalance + portfolioValueUsd;

  const dailyChangeUsd = calculateDailyChange(tokenTransfers, walletAddress);
  const dailyChangePercent =
    usdcBalance > 0 ? (dailyChangeUsd / usdcBalance) * 100 : 0;

  let joinedDate = 'Unknown';
  if (firstTxList.length > 0) {
    const ts = Number(firstTxList[0].timeStamp) * 1000;
    joinedDate = format(new Date(ts), 'MMM yyyy');
  }

  return {
    address: walletAddress,
    dailyChangePercent: Math.round(dailyChangePercent * 10) / 10,
    dailyChangeUsd: Math.round(dailyChangeUsd * 100) / 100,
    joinedDate,
    portfolioValueUsd: Math.round(portfolioValueUsd * 100) / 100,
    usdcBalance: Math.round(usdcBalance * 100) / 100,
    usdcPlusPortfolio: Math.round(usdcPlusPortfolio * 100) / 100
  };
}
