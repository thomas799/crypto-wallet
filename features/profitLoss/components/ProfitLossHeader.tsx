import { motion } from 'framer-motion';
import Image from 'next/image';

import { cn } from '../../shared/utils';

interface ProfitLossHeaderProps {
  isFetching: boolean;
  isPositive: boolean;
  onRefresh: () => void;
}

export function ProfitLossHeader({
  isFetching,
  isPositive,
  onRefresh
}: ProfitLossHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'text-[10px] leading-none',
          isPositive ? 'text-[#3CAB68]' : 'rotate-180 text-danger'
        )}
        style={{
          transform: isPositive ? 'scaleY(0.75)' : 'scaleY(0.75) rotate(180deg)'
        }}
      >
        ▲
      </span>
      <span className="text-sm font-normal leading-[18px] tracking-[-0.02em] text-[#868686]">
        Profit/Loss
      </span>
      <motion.button
        className="rounded-full p-0.5 hover:opacity-70"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRefresh}
      >
        <Image
          alt=""
          className={cn(isFetching && 'animate-pulse')}
          height={16}
          src="/share-icon.svg"
          width={16}
        />
      </motion.button>
    </div>
  );
}
