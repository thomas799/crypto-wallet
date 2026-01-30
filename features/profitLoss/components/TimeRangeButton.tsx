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
        'relative flex h-6 items-center justify-center rounded-[70px] px-3 text-xs font-normal leading-[15px] tracking-[-0.02em] transition-colors',
        selectedRange === range
          ? 'text-[#FF5100]'
          : 'text-[#868686] hover:text-gray-600'
      )}
      whileHover={selectedRange !== range ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      onClick={() => onRangeChange(range)}
    >
      {selectedRange === range && (
        <motion.div
          className="absolute inset-0 rounded-[70px] bg-[rgba(255,81,0,0.1)]"
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
