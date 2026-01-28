export type TimeRange = '1H' | '6H' | '1D' | '1W' | '1M' | 'All';

export interface WalletData {
  address: string;
  usdcBalance: number;
  portfolioValueUsd: number;
  usdcPlusPortfolio: number;
  dailyChangeUsd: number;
  dailyChangePercent: number;
  joinedDate: string;
}

export interface ChartDataPoint {
  timestamp: number;
  date: string;
  value: number;
}

export interface ProfitLossData {
  points: ChartDataPoint[];
  totalChange: number;
  totalChangePercent: number;
  periodLabel: string;
}

export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
}

export const TIME_RANGE_CONFIG: Record<
  TimeRange,
  { label: string; periodLabel: string; seconds: number }
> = {
  '1H': { label: '1H', periodLabel: 'Past Hour', seconds: 3600 },
  '6H': { label: '6H', periodLabel: 'Past 6 Hours', seconds: 21600 },
  '1D': { label: '1D', periodLabel: 'Past Day', seconds: 86400 },
  '1W': { label: '1W', periodLabel: 'Past Week', seconds: 604800 },
  '1M': { label: '1M', periodLabel: 'Past Month', seconds: 2592000 },
  All: { label: 'All', periodLabel: 'All Time', seconds: 0 },
};
