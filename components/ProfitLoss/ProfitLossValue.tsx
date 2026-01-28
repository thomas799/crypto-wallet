import NumberFlow from '@number-flow/react';
import { cn } from '@/lib/utils';

interface ProfitLossValueProps {
  value: number;
  label: string;
  isPositive: boolean;
}

export function ProfitLossValue({
  value,
  label,
  isPositive,
}: ProfitLossValueProps) {
  return (
    <div className="mt-4">
      <div
        className={cn(
          'text-4xl font-bold',
          isPositive ? 'text-success' : 'text-danger'
        )}
      >
        <NumberFlow
          format={{
            currency: 'USD',
            signDisplay: 'always',
            style: 'currency',
          }}
          value={value}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}
