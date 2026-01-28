import NumberFlow from '@number-flow/react';
import type { WalletData } from '@/types';

interface PortfolioStatsProps {
  wallet: WalletData;
}

export function PortfolioStats({ wallet }: PortfolioStatsProps) {
  return (
    <div className="mt-5 flex items-center gap-6 border-b border-gray-100 pb-5">
      <div>
        <p className="text-xs text-gray-500">Portfolio ( Not USDC )</p>
        <p className="mt-0.5 text-lg font-semibold text-gray-900">
          <NumberFlow
            format={{
              currency: 'USD',
              style: 'currency',
            }}
            value={wallet.portfolioValueUsd}
          />
        </p>
      </div>
      <div className="border-l border-gray-100 pl-6">
        <p className="text-xs text-gray-500">USDC + Portfolio</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-success" />
          <p className="text-lg font-semibold text-gray-900">
            <NumberFlow
              format={{
                currency: 'USD',
                style: 'currency',
              }}
              value={wallet.usdcPlusPortfolio}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
