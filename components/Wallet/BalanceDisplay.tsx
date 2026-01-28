import NumberFlow from '@number-flow/react';
import { cn } from '@/lib/utils';
import type { WalletData } from '@/types';

interface BalanceDisplayProps {
  wallet: WalletData;
}

export function BalanceDisplay({ wallet }: BalanceDisplayProps) {
  const isPositive = wallet.dailyChangeUsd >= 0;

  return (
    <div className="mt-6">
      <div className="text-5xl font-bold tracking-tight text-gray-900">
        <NumberFlow
          format={{
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }}
          suffix=" USDC"
          value={wallet.usdcBalance}
        />
      </div>
      <div
        className={cn(
          'mt-2 flex items-center gap-1.5 text-sm font-medium',
          isPositive ? 'text-success' : 'text-danger'
        )}
      >
        <NumberFlow
          format={{
            currency: 'USD',
            signDisplay: 'always',
            style: 'currency',
          }}
          value={wallet.dailyChangeUsd}
        />
        <span>{isPositive ? '\u2191' : '\u2193'}</span>
        <NumberFlow
          format={{
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          }}
          suffix="%"
          value={Math.abs(wallet.dailyChangePercent)}
        />
        <span className="text-gray-400">Today</span>
      </div>
    </div>
  );
}
