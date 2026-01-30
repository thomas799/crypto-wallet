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
    <div className="grid grid-cols-2 gap-2">
      <DepositButton onDeposit={onDeposit} />
      <WithdrawButton onWithdraw={onWithdraw} />
    </div>
  );
}
