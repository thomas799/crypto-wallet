'use server';

import { format } from 'date-fns';
import { formatUnits } from 'viem';

import type { ChartDataPoint, ProfitLossData, TimeRange } from './types';

import { getEthPrice, getTokenTransfers } from '../shared/api/etherscan';
import { IS_DEMO, walletAddress } from '../shared/config';
import { TIME_RANGE_CONFIG } from './config';
import { getDateFormat, getDemoProfitLossData, getStartTime } from './utils';

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
