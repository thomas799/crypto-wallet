'use server';

import { format, subDays, subHours, subMonths } from 'date-fns';
import { formatUnits } from 'viem';

import type { ChartDataPoint, ProfitLossData, TimeRange } from './types';

import {
  getEthPrice,
  getTokenTransfers,
  walletAddress
} from '../../lib/etherscan';
import { TIME_RANGE_CONFIG } from './config';

const IS_DEMO = !process.env.ETHERSCAN_API_KEY;

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
      value: Math.round(value * 100) / 100
    });
  }

  return points;
}

function getDemoProfitLossData(timeRange: TimeRange): ProfitLossData {
  const config = TIME_RANGE_CONFIG[timeRange];
  const points = generateDemoChartPoints(timeRange);
  const first = points[0]?.value ?? 0;
  const last = points[points.length - 1]?.value ?? 0;
  const totalChange = Math.round((last - first) * 100) / 100;
  const totalChangePercent =
    first !== 0
      ? Math.round(((last - first) / Math.abs(first)) * 1000) / 10
      : 0;

  return {
    periodLabel: config.periodLabel,
    points,
    totalChange,
    totalChangePercent
  };
}

export async function getProfitLossData(
  timeRange: TimeRange
): Promise<ProfitLossData> {
  if (IS_DEMO) return getDemoProfitLossData(timeRange);

  if (!walletAddress) {
    throw new Error(
      'NEXT_PUBLIC_WALLET_ADDRESS is not set in environment variables'
    );
  }

  const config = TIME_RANGE_CONFIG[timeRange];

  try {
    const [tokenTransfers, ethPriceData] = await Promise.all([
      getTokenTransfers(walletAddress),
      getEthPrice()
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
          value: 0
        });
      }
    } else {
      for (const tx of filtered) {
        const ts = Number(tx.timeStamp) * 1000;
        const val = Number(
          formatUnits(BigInt(tx.value), Number(tx.tokenDecimal))
        );
        const isIncoming = tx.to.toLowerCase() === walletAddress.toLowerCase();

        const isEthToken =
          tx.tokenSymbol.toUpperCase() === 'ETH' ||
          tx.tokenSymbol.toUpperCase() === 'WETH';
        const usdValue = isEthToken ? val * ethPrice : val;

        cumulative += isIncoming ? usdValue : -usdValue;

        points.push({
          date: format(new Date(ts), dateFormat),
          timestamp: ts,
          value: Math.round(cumulative * 100) / 100
        });
      }
    }

    const totalChange = points.length > 0 ? points[points.length - 1].value : 0;
    const firstVal = points.length > 1 ? points[0].value : 0;
    const totalChangePercent =
      firstVal !== 0
        ? ((totalChange - firstVal) / Math.abs(firstVal)) * 100
        : 0;

    return {
      periodLabel: config.periodLabel,
      points,
      totalChange: Math.round(totalChange * 100) / 100,
      totalChangePercent: Math.round(totalChangePercent * 10) / 10
    };
  } catch (error) {
    console.error('Failed to fetch profit/loss data:', error);
    return getDemoProfitLossData(timeRange);
  }
}
