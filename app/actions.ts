'use server';

import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { format, subDays, subHours, subMonths } from 'date-fns';

import {
  getEthBalance,
  getEthPrice,
  getTokenTransfers,
  getTransactionList,
  getUsdcBalance,
  walletAddress,
} from '@/lib/etherscan';
import {
  publicClient,
  usdcAddress,
  walletClient,
  walletAddress as viemWalletAddress,
} from '@/lib/viem-client';
import type {
  ChartDataPoint,
  ProfitLossData,
  TimeRange,
  TransactionResult,
  WalletData,
} from '@/types';
import { TIME_RANGE_CONFIG } from '@/types';

const IS_DEMO = !process.env.ETHERSCAN_API_KEY;

function generateDemoChartPoints(timeRange: TimeRange): ChartDataPoint[] {
  const config = TIME_RANGE_CONFIG[timeRange];
  const dateFormat = getDateFormat(timeRange);
  const now = Date.now();
  const rangeMs = config.seconds * 1000 || 90 * 86400_000; 

  const pointCount = 30;
  const step = rangeMs / pointCount;
  const start = now - rangeMs;

  const points: ChartDataPoint[] = [];
  let value = 150;

  let seed = timeRange.charCodeAt(0) * 17 + timeRange.length * 31;
  const pseudoRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed % 1000) / 1000;
  };

  for (let i = 0; i <= pointCount; i++) {
    const t = start + step * i;

    value += (pseudoRandom() - 0.42) * 18;
    value = Math.max(50, value);

    points.push({
      date: format(new Date(t), dateFormat),
      timestamp: t,
      value: Math.round(value * 100) / 100,
    });
  }

  return points;
}

function getDemoWalletData(): WalletData {
  return {
    address: '0xDemo...Address',
    dailyChangePercent: 5.2,
    dailyChangeUsd: 23.43,
    joinedDate: 'Nov 2025',
    portfolioValueUsd: 3361.42,
    usdcBalance: 984.42,
    usdcPlusPortfolio: 0.01,
  };
}

function getDemoProfitLossData(timeRange: TimeRange): ProfitLossData {
  const config = TIME_RANGE_CONFIG[timeRange];
  const points = generateDemoChartPoints(timeRange);
  const first = points[0]?.value ?? 0;
  const last = points[points.length - 1]?.value ?? 0;
  const totalChange = Math.round((last - first) * 100) / 100;
  const totalChangePercent =
    first !== 0 ? Math.round(((last - first) / Math.abs(first)) * 1000) / 10 : 0;

  return {
    periodLabel: config.periodLabel,
    points,
    totalChange,
    totalChangePercent,
  };
}

export async function getWalletData(): Promise<WalletData> {
  if (IS_DEMO) return getDemoWalletData();

  if (!walletAddress) {
    throw new Error('NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables');
  }

  try {
    const [usdcRaw, ethBalanceWei, ethPriceData, firstTxList, tokenTransfers] =
      await Promise.all([
        getUsdcBalance(),
        getEthBalance(),
        getEthPrice(),
        getTransactionList(walletAddress, 'asc', '1', '1'),
        getTokenTransfers(walletAddress),
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
      const val = Number(formatUnits(BigInt(tx.value), Number(tx.tokenDecimal)));
      const isIncoming =
        tx.to.toLowerCase() === walletAddress.toLowerCase();
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
      usdcPlusPortfolio: Math.round(usdcPlusPortfolio * 100) / 100,
    };
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
    return getDemoWalletData();
  }
}

function getStartTime(timeRange: TimeRange): Date {
  const now = new Date();
  switch (timeRange) {
    case '1H':
      return subHours(now, 1);
    case '6H':
      return subHours(now, 6);
    case '1D':
      return subDays(now, 1);
    case '1W':
      return subDays(now, 7);
    case '1M':
      return subMonths(now, 1);
    case 'All':
      return new Date(0);
  }
}

function getDateFormat(timeRange: TimeRange): string {
  switch (timeRange) {
    case '1H':
    case '6H':
      return 'HH:mm';
    case '1D':
      return 'HH:mm';
    case '1W':
      return 'EEE, MMM d';
    case '1M':
      return 'MMM d';
    case 'All':
      return 'MMM yyyy';
  }
}

export async function getProfitLossData(
  timeRange: TimeRange
): Promise<ProfitLossData> {
  if (IS_DEMO) return getDemoProfitLossData(timeRange);

  if (!walletAddress) {
    throw new Error('NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables');
  }

  const config = TIME_RANGE_CONFIG[timeRange];

  try {
    const [tokenTransfers, ethPriceData] = await Promise.all([
      getTokenTransfers(walletAddress),
      getEthPrice(),
    ]);

    const ethPrice = Number(ethPriceData?.ethusd ?? 0);
    const startTime = getStartTime(timeRange);
    const startTs = Math.floor(startTime.getTime() / 1000);
    const dateFormat = getDateFormat(timeRange);

    const filtered = tokenTransfers.filter(
      (tx) => Number(tx.timeStamp) >= startTs
    );

    const points: ChartDataPoint[] = [];
    let cumulative = 0;

    if (filtered.length === 0) {

      const now = Date.now();
      const rangeMs = config.seconds * 1000 || now;
      const step = Math.max(rangeMs / 20, 60_000);
      const start = config.seconds > 0 ? now - rangeMs : now - 86400_000;

      for (let t = start; t <= now; t += step) {
        points.push({
          date: format(new Date(t), dateFormat),
          timestamp: t,
          value: 0,
        });
      }
    } else {
      for (const tx of filtered) {
        const ts = Number(tx.timeStamp) * 1000;
        const val = Number(
          formatUnits(BigInt(tx.value), Number(tx.tokenDecimal))
        );
        const isIncoming =
          tx.to.toLowerCase() === walletAddress.toLowerCase();

        const isEthToken =
          tx.tokenSymbol.toUpperCase() === 'ETH' ||
          tx.tokenSymbol.toUpperCase() === 'WETH';
        const usdValue = isEthToken ? val * ethPrice : val;

        cumulative += isIncoming ? usdValue : -usdValue;

        points.push({
          date: format(new Date(ts), dateFormat),
          timestamp: ts,
          value: Math.round(cumulative * 100) / 100,
        });
      }
    }

    const totalChange = points.length > 0 ? points[points.length - 1].value : 0;
    const firstVal = points.length > 1 ? points[0].value : 0;
    const totalChangePercent =
      firstVal !== 0 ? ((totalChange - firstVal) / Math.abs(firstVal)) * 100 : 0;

    return {
      periodLabel: config.periodLabel,
      points,
      totalChange: Math.round(totalChange * 100) / 100,
      totalChangePercent: Math.round(totalChangePercent * 10) / 10,
    };
  } catch (error) {
    console.error('Failed to fetch profit/loss data:', error);
    return getDemoProfitLossData(timeRange);
  }
}

export async function deposit(
  amount: string,
  _fromAddress: string
): Promise<TransactionResult> {
  if (IS_DEMO) {

    return {
      hash: `0xdemo${Date.now().toString(16)}${'0'.repeat(40)}`,
      success: true,
    };
  }

  try {
    if (!walletClient) {
      return { error: 'Wallet not configured (missing private key)', success: false };
    }

    if (!usdcAddress) {
      return { error: 'USDC_CONTRACT_ADDRESS is not set in environment variables', success: false };
    }

    if (!viemWalletAddress) {
      return { error: 'NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables', success: false };
    }

    const parsedAmount = parseUnits(amount, 6);

    const { request } = await publicClient.simulateContract({
      abi: erc20Abi,
      account: walletClient.account,
      address: usdcAddress,
      args: [viemWalletAddress, parsedAmount],
      functionName: 'transfer',
    });

    const hash = await walletClient.writeContract(request);

    return { hash, success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Deposit failed';
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
      success: true,
    };
  }

  try {
    if (!walletClient) {
      return { error: 'Wallet not configured (missing private key)', success: false };
    }

    if (!usdcAddress) {
      return { error: 'USDC_CONTRACT_ADDRESS is not set in environment variables', success: false };
    }

    const parsedAmount = parseUnits(amount, 6);

    const { request } = await publicClient.simulateContract({
      abi: erc20Abi,
      account: walletClient.account,
      address: usdcAddress,
      args: [toAddress as `0x${string}`, parsedAmount],
      functionName: 'transfer',
    });

    const hash = await walletClient.writeContract(request);

    return { hash, success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Withdrawal failed';
    return { error: message, success: false };
  }
}

