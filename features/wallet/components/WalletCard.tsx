'use client';

import type { WalletData } from '../types';

import { useWallet } from '../hooks/useWallet';
import { BalanceDisplay } from './BalanceDisplay';
import { PortfolioStats } from './PortfolioStats';
import { TransactionButtons } from './TransactionButtons';
import { WalletHeader } from './WalletHeader';

interface WalletCardProps {
  initialData: WalletData;
  onDeposit: () => void;
  onWithdraw: () => void;
}

export function WalletCard({
  initialData,
  onDeposit,
  onWithdraw
}: WalletCardProps) {
  const { wallet } = useWallet(initialData);

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-lg">
      <div>
        <div className="flex items-start justify-between">
          <WalletHeader wallet={wallet} />
          <PortfolioStats wallet={wallet} />
        </div>
        <BalanceDisplay wallet={wallet} />
      </div>
      <TransactionButtons onDeposit={onDeposit} onWithdraw={onWithdraw} />
    </div>
  );
}
