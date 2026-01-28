'use client';

import type { ProfitLossData } from '../types';

import { useProfitLoss } from '../hooks/useProfitLoss';
import { PriceChart } from './PriceChart';
import { ProfitLossHeader } from './ProfitLossHeader';
import { ProfitLossValue } from './ProfitLossValue';
import { TimeRangeSelector } from './TimeRangeSelector';

interface ProfitLossCardProps {
  initialData: ProfitLossData;
}

export function ProfitLossCard({ initialData }: ProfitLossCardProps) {
  const {
    chartData,
    displayLabel,
    displayValue,
    handleHover,
    handleRefresh,
    isFetching,
    isPositive,
    setTimeRange,
    timeRange
  } = useProfitLoss(initialData);

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <ProfitLossHeader
          isFetching={isFetching}
          isPositive={isPositive}
          onRefresh={handleRefresh}
        />
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
      </div>
      <ProfitLossValue
        isPositive={isPositive}
        label={displayLabel}
        value={displayValue}
      />
      <PriceChart data={chartData.points} onHover={handleHover} />
    </div>
  );
}
