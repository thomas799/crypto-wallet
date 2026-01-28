import { DashboardContent } from '../../features/dashboard';
import { getProfitLossData } from '../../features/profitLoss';
import { getWalletData } from '../../features/wallet';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [walletData, chartData] = await Promise.all([
    getWalletData(),
    getProfitLossData('6H')
  ]);

  return (
    <DashboardContent
      initialChartData={chartData}
      initialWalletData={walletData}
    />
  );
}
