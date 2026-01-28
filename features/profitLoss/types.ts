export type TimeRange = '1H' | '6H' | '1D' | '1W' | '1M' | 'All';

export interface ChartDataPoint {
  date: string;
  timestamp: number;
  value: number;
}

export interface ProfitLossData {
  periodLabel: string;
  points: ChartDataPoint[];
  totalChange: number;
  totalChangePercent: number;
}
