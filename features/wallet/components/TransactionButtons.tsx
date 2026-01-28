import { DepositButton } from 'features/shared/components/DepositButton';
import { WithdrawButton } from 'features/shared/components/WithdrawButton';

interface TransactionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export function TransactionButtons({
  onDeposit,
  onWithdraw
}: TransactionButtonsProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <DepositButton onDeposit={onDeposit} />
      <WithdrawButton onWithdraw={onWithdraw} />
    </div>
  );
}
