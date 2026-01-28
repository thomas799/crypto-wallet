import { TimeRangeButton } from './TimeRangeButton';
import type { TimeRange } from '@/types';

const TIME_RANGES: TimeRange[] = ['1H', '6H', '1D', '1W', '1M', 'All'];

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({
  selectedRange,
  onRangeChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-50 p-1">
      {TIME_RANGES.map((range) => (
        <TimeRangeButton
          key={range}
          range={range}
          selectedRange={selectedRange}
          onRangeChange={onRangeChange}
        />
      ))}
    </div>
  );
}
