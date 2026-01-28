import NumberFlow from '@number-flow/react';

import type { WalletData } from '../types';

interface PortfolioStatsProps {
  wallet: WalletData;
}

export function PortfolioStats({ wallet }: PortfolioStatsProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="text-xs text-gray-500">Portfolio ( Not USDC )</p>
        <p className="mt-0.5 text-base font-semibold text-gray-900">
          <NumberFlow
            format={{
              currency: 'USD',
              style: 'currency'
            }}
            value={wallet.portfolioValueUsd}
          />
        </p>
      </div>
      <div className="border-l border-gray-200 pl-6 text-right">
        <p className="text-xs text-gray-500">USDC + Portfolio</p>
        <div className="mt-0.5 flex items-center justify-end gap-1.5">
          <span className="inline-flex">
            <span className="-mr-1 inline-block h-3 w-3 rounded-full bg-success" />
            <span className="inline-block h-3 w-3 rounded-full bg-orange-400" />
          </span>
          <p className="text-base font-semibold text-gray-900">
            <NumberFlow
              format={{
                currency: 'USD',
                style: 'currency'
              }}
              value={wallet.usdcPlusPortfolio}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
