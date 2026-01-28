import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimeRange } from '@/types';

interface TimeRangeButtonProps {
  range: TimeRange;
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export function TimeRangeButton({
  range,
  selectedRange,
  onRangeChange,
}: TimeRangeButtonProps) {
  return (
    <motion.button
      className={cn(
        'relative rounded-full px-3 py-1 text-xs font-medium transition-colors',
        selectedRange === range
          ? 'text-white'
          : 'text-gray-500 hover:text-gray-700'
      )}
      key={range}
      onClick={() => onRangeChange(range)}
      whileHover={selectedRange !== range ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
    >
      {selectedRange === range && (
        <motion.div
          className="absolute inset-0 rounded-full bg-success"
          layoutId="timeRangeIndicator"
          transition={{
            damping: 25,
            stiffness: 300,
            type: 'spring',
          }}
        />
      )}
      <span className="relative z-10">{range}</span>
    </motion.button>
  );
}
