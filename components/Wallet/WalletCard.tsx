'use client';

import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getWalletData } from '@/app/actions';
import { TransactionModal } from '@/components/TransactionModal/TransactionModal';
import { WalletHeader } from '@/components/Wallet/WalletHeader';
import { PortfolioStats } from '@/components/Wallet/PortfolioStats';
import { BalanceDisplay } from '@/components/Wallet/BalanceDisplay';
import { TransactionButtons } from '@/components/Wallet/TransactionButtons/TransactionButtons';
import type { WalletData } from '@/types';

interface WalletCardProps {
  initialData: WalletData;
}

export function WalletCard({ initialData }: WalletCardProps) {
  const { data } = useQuery({
    initialData,
    queryFn: () => getWalletData(),
    queryKey: ['walletData'],
    refetchInterval: 60_000,
  });

  const wallet = data ?? initialData;

  const [modal, setModal] = useState<'deposit' | 'withdraw' | null>(null);

  const openDeposit = useCallback(() => setModal('deposit'), []);
  const openWithdraw = useCallback(() => setModal('withdraw'), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-lg">
        <div>
          <WalletHeader wallet={wallet} />
          <PortfolioStats wallet={wallet} />
          <BalanceDisplay wallet={wallet} />
        </div>
        <TransactionButtons onDeposit={openDeposit} onWithdraw={openWithdraw} />
      </div>
      <TransactionModal
        isOpen={modal !== null}
        mode={modal ?? 'deposit'}
        onClose={closeModal}
      />
    </>
  );
}
