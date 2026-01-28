import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

import { cn } from '../../../lib/utils';

interface RefreshButtonProps {
  isFetching: boolean;
  onRefresh: () => void;
}

export function RefreshButton({ isFetching, onRefresh }: RefreshButtonProps) {
  return (
    <motion.button
      className="rounded-full p-1 text-gray-400 hover:text-gray-600"
      whileHover={{ rotate: 180, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onRefresh}
    >
      <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
    </motion.button>
  );
}
