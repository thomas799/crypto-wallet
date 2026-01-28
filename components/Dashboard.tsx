'use client';

import { ProfitLossCard } from '@/components/ProfitLoss/ProfitLossCard';
import { WalletCard } from '@/components/Wallet/WalletCard';
import type { ProfitLossData, WalletData } from '@/types';

interface DashboardProps {
  initialChartData: ProfitLossData;
  initialWalletData: WalletData;
}

export function Dashboard({
  initialChartData,
  initialWalletData,
}: DashboardProps) {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
      <WalletCard initialData={initialWalletData} />
      <ProfitLossCard initialData={initialChartData} />
    </div>
  );
}
