import NumberFlow from '@number-flow/react';

import type { WalletData } from '../types';

import { cn } from '../../shared/utils';

interface BalanceDisplayProps {
  wallet: WalletData;
}

export function BalanceDisplay({ wallet }: BalanceDisplayProps) {
  const isPositive = wallet.dailyChangeUsd >= 0;

  return (
    <div>
      <div className="text-[40px] font-normal leading-[51px] tracking-[-0.02em] text-black">
        <NumberFlow
          format={{
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }}
          suffix=" USDC"
          value={wallet.usdcBalance}
        />
      </div>
      <div className="mt-1 flex items-center gap-1 text-sm font-medium leading-[18px] tracking-[-0.02em]">
        <span className={cn(isPositive ? 'text-success' : 'text-danger')}>
          <NumberFlow
            format={{
              currency: 'USD',
              signDisplay: 'always',
              style: 'currency'
            }}
            value={wallet.dailyChangeUsd}
          />
        </span>
        <span
          className={cn(
            'flex items-center gap-0.5',
            isPositive ? 'text-success' : 'text-danger'
          )}
        >
          <span className="text-xs">{isPositive ? '\u2191' : '\u2193'}</span>
          <NumberFlow
            format={{
              maximumFractionDigits: 1,
              minimumFractionDigits: 1
            }}
            suffix="%"
            value={Math.abs(wallet.dailyChangePercent)}
          />
        </span>
        <span className="text-[#868686]">Today</span>
      </div>
    </div>
  );
}
