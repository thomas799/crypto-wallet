import { motion } from 'framer-motion';

import type { TimeRange } from '../types';

import { cn } from '../../shared/utils';

interface TimeRangeButtonProps {
  onRangeChange: (range: TimeRange) => void;
  range: TimeRange;
  selectedRange: TimeRange;
}

export function TimeRangeButton({
  onRangeChange,
  range,
  selectedRange
}: TimeRangeButtonProps) {
  return (
    <motion.button
      key={range}
      className={cn(
        'relative rounded-full px-3 py-1 text-xs font-medium transition-colors',
        selectedRange === range
          ? 'text-orange-900'
          : 'text-gray-500 hover:text-gray-700'
      )}
      whileHover={selectedRange !== range ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      onClick={() => onRangeChange(range)}
    >
      {selectedRange === range && (
        <motion.div
          className="absolute inset-0 rounded-full bg-orange-200"
          layoutId="timeRangeIndicator"
          transition={{
            damping: 25,
            stiffness: 300,
            type: 'spring'
          }}
        />
      )}
      <span className="relative z-10">{range}</span>
    </motion.button>
  );
}
