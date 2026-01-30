import { ArrowUpRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <ArrowUpRight
        className={cn('h-4 w-4', isPositive ? 'text-[#3CAB68]' : 'text-danger')}
      />
      <span className="text-sm font-normal leading-[18px] tracking-[-0.02em] text-[#868686]">Profit/Loss</span>
      <motion.button
        className="rounded-full p-0.5 text-[#868686] hover:text-gray-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRefresh}
      >
        <Share2 className={cn('h-4 w-4', isFetching && 'animate-pulse')} />
      </motion.button>
    </div>
  );
}
