interface TransactionFormProps {
  amount: string;
  address: string;
  isDeposit: boolean;
  onAmountChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export function TransactionForm({
  amount,
  address,
  isDeposit,
  onAmountChange,
  onAddressChange,
}: TransactionFormProps) {
  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Amount (USDC)
        </label>
        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-orange-500"
          min="0"
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          required
          step="0.01"
          type="number"
          value={amount}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {isDeposit ? 'From Address' : 'To Address'}
        </label>
        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm text-gray-900 outline-none transition-colors focus:border-orange-500"
          onChange={(e) => onAddressChange(e.target.value)}
          pattern="^0x[a-fA-F0-9]{40}$"
          placeholder="0x..."
          required
          title="Valid Ethereum address (0x followed by 40 hex characters)"
          type="text"
          value={address}
        />
      </div>
    </>
  );
}
