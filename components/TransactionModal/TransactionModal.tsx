'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState, useTransition } from 'react';

import { deposit, withdraw } from '@/app/actions';
import { CloseButton } from './CloseButton';
import { SubmitButton } from './SubmitButton';
import { TransactionForm } from './TransactionForm';
import { TransactionResult } from './TransactionResult';

interface TransactionModalProps {
  isOpen: boolean;
  mode: 'deposit' | 'withdraw';
  onClose: () => void;
}

export function TransactionModal({
  isOpen,
  mode,
  onClose,
}: TransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<{
    error?: string;
    hash?: string;
    success: boolean;
  } | null>(null);
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

  const handleClose = useCallback(() => {
    setAmount('');
    setAddress('');
    setResult(null);
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            exit={{ scale: 0.95, y: 20 }}
            initial={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ damping: 25, stiffness: 300, type: 'spring' }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <CloseButton onClick={handleClose} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <TransactionForm
                amount={amount}
                address={address}
                isDeposit={isDeposit}
                onAmountChange={setAmount}
                onAddressChange={setAddress}
              />

              <TransactionResult result={result} />

              <SubmitButton isDeposit={isDeposit} isPending={isPending} />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
