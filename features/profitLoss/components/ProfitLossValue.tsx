import NumberFlow from '@number-flow/react';

interface ProfitLossValueProps {
  isPositive: boolean;
  label: string;
  value: number;
}

export function ProfitLossValue({ label, value }: ProfitLossValueProps) {
  return (
    <div>
      <div className="text-[40px] font-normal leading-[51px] tracking-[-0.02em] text-black">
        <NumberFlow
          format={{
            currency: 'USD',
            signDisplay: 'always',
            style: 'currency'
          }}
          value={value}
        />
      </div>
      <p className="mt-1 text-sm font-medium leading-[18px] tracking-[-0.02em] text-[#868686]">
        {label}
      </p>
    </div>
  );
}
