import NumberFlow from '@number-flow/react';
import Image from 'next/image';

import type { WalletData } from '../types';

interface PortfolioStatsProps {
  wallet: WalletData;
}

export function PortfolioStats({ wallet }: PortfolioStatsProps) {
  return (
    <div className="flex items-center gap-7">
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-normal leading-[15px] tracking-[-0.02em] text-[#868686]">
          Portfolio ( Not USDC )
        </p>
        <p className="text-base font-medium leading-5 tracking-[-0.02em] text-black">
          <NumberFlow
            format={{
              currency: 'USD',
              style: 'currency'
            }}
            value={wallet.portfolioValueUsd}
          />
        </p>
      </div>
      <div className="h-6 w-px bg-[#E5E5E5]" />
      <div className="flex flex-col items-center gap-0.5">
        <p className="text-xs font-normal leading-[15px] tracking-[-0.02em] text-[#868686]">
          USDC + Portfolio
        </p>
        <div className="flex items-center gap-1.5">
          <Image alt="" height={24} src="/money-icon.png" width={24} />
          <p className="text-base font-medium leading-5 tracking-[-0.02em] text-black">
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
