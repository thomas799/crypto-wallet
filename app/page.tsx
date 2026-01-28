import { Dashboard } from '@/components/Dashboard';

import { getProfitLossData, getWalletData } from './actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [walletData, chartData] = await Promise.all([
    getWalletData(),
    getProfitLossData('6H'),
  ]);

  return <Dashboard initialChartData={chartData} initialWalletData={walletData} />;
}
