import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RefreshButton } from './RefreshButton';

interface ProfitLossHeaderProps {
  isPositive: boolean;
  isFetching: boolean;
  onRefresh: () => void;
}

export function ProfitLossHeader({
  isPositive,
  isFetching,
  onRefresh,
}: ProfitLossHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <TrendingUp
        className={cn(
          'h-4 w-4',
          isPositive ? 'text-success' : 'text-danger'
        )}
      />
      <span className="font-semibold text-gray-900">Profit/Loss</span>
      <RefreshButton isFetching={isFetching} onRefresh={onRefresh} />
    </div>
  );
}
