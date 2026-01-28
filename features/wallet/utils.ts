import { formatUnits } from 'viem';

import type { TokenTransfer } from '../shared/api/etherscan';

export function calculateDailyChange(
  tokenTransfers: TokenTransfer[],
  walletAddress: string
): number {
  const oneDayAgo = Math.floor(Date.now() / 1000) - 86400;
  const recentTransfers = tokenTransfers.filter(
    (tx) => Number(tx.timeStamp) >= oneDayAgo
  );

  let dailyChangeUsd = 0;
  for (const tx of recentTransfers) {
    const val = Number(formatUnits(BigInt(tx.value), Number(tx.tokenDecimal)));
    const isIncoming = tx.to.toLowerCase() === walletAddress.toLowerCase();
    dailyChangeUsd += isIncoming ? val : -val;
  }

  return dailyChangeUsd;
}
