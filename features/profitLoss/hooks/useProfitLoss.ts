import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import type { ChartDataPoint, ProfitLossData, TimeRange } from '../types';

import { getProfitLossData } from '../actions';

export interface UseProfitLossReturn {
  chartData: ProfitLossData;
  displayLabel: string;
  displayValue: number;
  handleHover: (point: ChartDataPoint | null) => void;
  handleRefresh: () => void;
  hoveredPoint: ChartDataPoint | null;
  isFetching: boolean;
  isPositive: boolean;
  setTimeRange: (range: TimeRange) => void;
  timeRange: TimeRange;
}

export function useProfitLoss(
  initialData: ProfitLossData
): UseProfitLossReturn {
  const [timeRange, setTimeRange] = useState<TimeRange>('6H');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    initialData: timeRange === '6H' ? initialData : undefined,
    queryFn: () => getProfitLossData(timeRange),
    queryKey: ['profitLoss', timeRange],
    refetchInterval: 60_000
  });

  const chartData = data ?? initialData;

  const displayValue = hoveredPoint
    ? hoveredPoint.value
    : chartData.totalChange;
  const displayLabel = hoveredPoint ? hoveredPoint.date : chartData.periodLabel;
  const isPositive = displayValue >= 0;

  const handleHover = useCallback((point: ChartDataPoint | null) => {
    setHoveredPoint(point);
  }, []);

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['profitLoss'] });
  }, [queryClient]);

  return {
    chartData,
    displayLabel,
    displayValue,
    handleHover,
    handleRefresh,
    hoveredPoint,
    isFetching,
    isPositive,
    setTimeRange,
    timeRange
  };
}
