import type { TimeRange } from '../types';

import { TIME_RANGES } from '../config';
import { TimeRangeButton } from './TimeRangeButton';

interface TimeRangeSelectorProps {
  onRangeChange: (range: TimeRange) => void;
  selectedRange: TimeRange;
}

export function TimeRangeSelector({
  onRangeChange,
  selectedRange
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-0">
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
