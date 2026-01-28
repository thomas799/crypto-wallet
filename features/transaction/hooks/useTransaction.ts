import { useCallback, useState, useTransition } from 'react';

import type { TransactionResult } from '../types';

import { deposit, withdraw } from '../actions';

export interface UseTransactionReturn {
  address: string;
  amount: string;
  handleClose: (onClose: () => void) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isDeposit: boolean;
  isPending: boolean;
  result: TransactionResult | null;
  setAddress: (value: string) => void;
  setAmount: (value: string) => void;
  title: string;
}

export function useTransaction(
  mode: 'deposit' | 'withdraw'
): UseTransactionReturn {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<TransactionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const isDeposit = mode === 'deposit';
  const title = isDeposit ? 'Deposit USDC' : 'Withdraw USDC';

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setResult(null);

      startTransition(async () => {
        const res = isDeposit
          ? await deposit(amount, address)
          : await withdraw(amount, address);
        setResult(res);
        if (res.success) {
          setAmount('');
          setAddress('');
        }
      });
    },
    [amount, address, isDeposit]
  );

  const handleClose = useCallback((onClose: () => void) => {
    setAmount('');
    setAddress('');
    setResult(null);
    onClose();
  }, []);

  return {
    address,
    amount,
    handleClose,
    handleSubmit,
    isDeposit,
    isPending,
    result,
    setAddress,
    setAmount,
    title
  };
}
