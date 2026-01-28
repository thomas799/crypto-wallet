'use server';

import { format } from 'date-fns';
import { formatUnits } from 'viem';

import type { WalletData } from './types';

import {
  getEthBalance,
  getEthPrice,
  getTokenTransfers,
  getTransactionList,
  getUsdcBalance,
  walletAddress
} from '../../lib/etherscan';

const IS_DEMO = !process.env.ETHERSCAN_API_KEY;

function getDemoWalletData(): WalletData {
  return {
    address: '0xDemo...Address',
    dailyChangePercent: 5.2,
    dailyChangeUsd: 23.43,
    joinedDate: 'Nov 2025',
    portfolioValueUsd: 3361.42,
    usdcBalance: 984.42,
    usdcPlusPortfolio: 0.01
  };
}

export async function getWalletData(): Promise<WalletData> {
  if (IS_DEMO) return getDemoWalletData();

  if (!walletAddress) {
    throw new Error(
      'NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables'
    );
  }

  try {
    const [usdcRaw, ethBalanceWei, ethPriceData, firstTxList, tokenTransfers] =
      await Promise.all([
        getUsdcBalance(),
        getEthBalance(),
        getEthPrice(),
        getTransactionList(walletAddress, 'asc', '1', '1'),
        getTokenTransfers(walletAddress)
      ]);

    const usdcBalance = Number(formatUnits(BigInt(usdcRaw || '0'), 6));
    const ethBalance = Number(formatUnits(BigInt(ethBalanceWei || '0'), 18));
    const ethPrice = Number(ethPriceData?.ethusd ?? 0);

    const portfolioValueUsd = ethBalance * ethPrice;
    const usdcPlusPortfolio = usdcBalance + portfolioValueUsd;

    const oneDayAgo = Math.floor(Date.now() / 1000) - 86400;
    const recentTransfers = tokenTransfers.filter(
      (tx) => Number(tx.timeStamp) >= oneDayAgo
    );

    let dailyChangeUsd = 0;
    for (const tx of recentTransfers) {
      const val = Number(
        formatUnits(BigInt(tx.value), Number(tx.tokenDecimal))
      );
      const isIncoming = tx.to.toLowerCase() === walletAddress.toLowerCase();
      dailyChangeUsd += isIncoming ? val : -val;
    }

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
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
    return getDemoWalletData();
  }
}
