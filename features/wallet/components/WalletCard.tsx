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
    <div className="flex flex-col justify-between gap-px rounded-lg border border-[#E5E5E5] bg-white p-5">
      <div className="flex items-center justify-between">
        <WalletHeader wallet={wallet} />
        <PortfolioStats wallet={wallet} />
      </div>
      <BalanceDisplay wallet={wallet} />
      <TransactionButtons onDeposit={onDeposit} onWithdraw={onWithdraw} />
    </div>
  );
}
