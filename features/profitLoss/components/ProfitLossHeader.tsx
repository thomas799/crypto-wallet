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
        className={cn('h-4 w-4', isPositive ? 'text-success' : 'text-danger')}
      />
      <span className="font-semibold text-gray-900">Profit/Loss</span>
      <motion.button
        className="rounded-full p-1 text-gray-400 hover:text-gray-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRefresh}
      >
        <Share2 className={cn('h-4 w-4', isFetching && 'animate-pulse')} />
      </motion.button>
    </div>
  );
}
