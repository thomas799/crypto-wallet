import { format, subDays, subHours, subMonths } from 'date-fns';

import type { ChartDataPoint, ProfitLossData, TimeRange } from './types';

import { TIME_RANGE_CONFIG } from './config';

export function getDateFormat(timeRange: TimeRange): string {
  switch (timeRange) {
    case '1H':
    case '6H':
      return 'HH:mm';
    case '1D':
      return 'HH:mm';
    case '1W':
      return 'EEE, MMM d';
    case '1M':
      return 'MMM d';
    case 'All':
      return 'MMM yyyy';
  }
}

export function getStartTime(timeRange: TimeRange): Date {
  const now = new Date();
  switch (timeRange) {
    case '1H':
      return subHours(now, 1);
    case '6H':
      return subHours(now, 6);
    case '1D':
      return subDays(now, 1);
    case '1W':
      return subDays(now, 7);
    case '1M':
      return subMonths(now, 1);
    case 'All':
      return new Date(0);
  }
}

export function generateDemoChartPoints(
  timeRange: TimeRange
): ChartDataPoint[] {
  const config = TIME_RANGE_CONFIG[timeRange];
  const dateFormat = getDateFormat(timeRange);
  const now = Date.now();
  const rangeMs = config.seconds * 1000 || 90 * 86400_000;

  const pointCount = 30;
  const step = rangeMs / pointCount;
  const start = now - rangeMs;

  const points: ChartDataPoint[] = [];
  let value = 150;

  let seed = timeRange.charCodeAt(0) * 17 + timeRange.length * 31;
  const pseudoRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed % 1000) / 1000;
  };

  for (let i = 0; i <= pointCount; i++) {
    const t = start + step * i;

    value += (pseudoRandom() - 0.42) * 18;
    value = Math.max(50, value);

    points.push({
      date: format(new Date(t), dateFormat),
      timestamp: t,
      value: Math.round(value * 100) / 100
    });
  }

  return points;
}

export function getDemoProfitLossData(timeRange: TimeRange): ProfitLossData {
  const config = TIME_RANGE_CONFIG[timeRange];
  const points = generateDemoChartPoints(timeRange);
  const first = points[0]?.value ?? 0;
  const last = points[points.length - 1]?.value ?? 0;
  const totalChange = Math.round((last - first) * 100) / 100;
  const totalChangePercent =
    first !== 0
      ? Math.round(((last - first) / Math.abs(first)) * 1000) / 10
      : 0;

  return {
    periodLabel: config.periodLabel,
    points,
    totalChange,
    totalChangePercent
  };
}
