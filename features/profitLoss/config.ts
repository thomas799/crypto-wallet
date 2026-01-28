import type { TimeRange } from './types';

export const TIME_RANGES: TimeRange[] = ['1H', '6H', '1D', '1W', '1M', 'All'];

export const TIME_RANGE_CONFIG: Record<
  TimeRange,
  { label: string; periodLabel: string; seconds: number }
> = {
  '1D': { label: '1D', periodLabel: 'Past Day', seconds: 86400 },
  '1H': { label: '1H', periodLabel: 'Past Hour', seconds: 3600 },
  '1M': { label: '1M', periodLabel: 'Past Month', seconds: 2592000 },
  '1W': { label: '1W', periodLabel: 'Past Week', seconds: 604800 },
  '6H': { label: '6H', periodLabel: 'Past 6 Hours', seconds: 21600 },
  All: { label: 'All', periodLabel: 'All Time', seconds: 0 }
};
