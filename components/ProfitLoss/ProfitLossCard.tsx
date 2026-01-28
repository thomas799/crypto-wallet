'use client';

import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getProfitLossData } from '@/app/actions';
import { PriceChart } from '@/components/ProfitLoss/PriceChart';
import { ProfitLossHeader } from '@/components/ProfitLoss/ProfitLossHeader/ProfitLossHeader';
import { TimeRangeSelector } from '@/components/ProfitLoss/TimeRangeSelector/TimeRangeSelector';
import { ProfitLossValue } from '@/components/ProfitLoss/ProfitLossValue';
import type { ChartDataPoint, ProfitLossData, TimeRange } from '@/types';

interface ProfitLossCardProps {
  initialData: ProfitLossData;
}

export function ProfitLossCard({ initialData }: ProfitLossCardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('6H');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    initialData: timeRange === '6H' ? initialData : undefined,
    queryFn: () => getProfitLossData(timeRange),
    queryKey: ['profitLoss', timeRange],
    refetchInterval: 60_000,
  });

  const chartData = data ?? initialData;

  const displayValue = hoveredPoint
    ? hoveredPoint.value
    : chartData.totalChange;
  const displayLabel = hoveredPoint
    ? hoveredPoint.date
    : chartData.periodLabel;
  const isPositive = displayValue >= 0;

  const handleHover = useCallback((point: ChartDataPoint | null) => {
    setHoveredPoint(point);
  }, []);

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['profitLoss'] });
  }, [queryClient]);

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <ProfitLossHeader
          isPositive={isPositive}
          isFetching={isFetching}
          onRefresh={handleRefresh}
        />
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
      </div>
      <ProfitLossValue
        value={displayValue}
        label={displayLabel}
        isPositive={isPositive}
      />
      <PriceChart data={chartData.points} onHover={handleHover} />
    </div>
  );
}
