'use client';

import type { ProfitLossData } from '../../profitLoss';
import type { WalletData } from '../../wallet';

import { ProfitLossCard } from '../../profitLoss';
import { TransactionModal } from '../../transaction';
import { WalletCard } from '../../wallet';
import { useDashboardContent } from '../hooks/useDashboardContent';

interface DashboardContentProps {
  initialChartData: ProfitLossData;
  initialWalletData: WalletData;
}

export function DashboardContent({
  initialChartData,
  initialWalletData
}: DashboardContentProps) {
  const { closeModal, modal, openDeposit, openWithdraw } =
    useDashboardContent();

  return (
    <>
      <div className="grid w-[1290px] max-w-full grid-cols-1 gap-3 lg:grid-cols-2">
        <WalletCard
          initialData={initialWalletData}
          onDeposit={openDeposit}
          onWithdraw={openWithdraw}
        />
        <ProfitLossCard initialData={initialChartData} />
      </div>
      <TransactionModal
        isOpen={modal !== null}
        mode={modal ?? 'deposit'}
        onClose={closeModal}
      />
    </>
  );
}
