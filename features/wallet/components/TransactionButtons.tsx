import { DepositButton, WithdrawButton } from '../../shared/ui';

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
