interface TransactionFormProps {
  address: string;
  amount: string;
  isDeposit: boolean;
  onAddressChange: (value: string) => void;
  onAmountChange: (value: string) => void;
}

export function TransactionForm({
  address,
  amount,
  isDeposit,
  onAddressChange,
  onAmountChange
}: TransactionFormProps) {
  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Amount (USDC)
        </label>
        <input
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-orange-500"
          min="0"
          placeholder="0.00"
          step="0.01"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {isDeposit ? 'From Address' : 'To Address'}
        </label>
        <input
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm text-gray-900 outline-none transition-colors focus:border-orange-500"
          pattern="^0x[a-fA-F0-9]{40}$"
          placeholder="0x..."
          title="Valid Ethereum address (0x followed by 40 hex characters)"
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
        />
      </div>
    </>
  );
}
