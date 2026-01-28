'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useTransaction } from '../hooks/useTransaction';
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
  onClose
}: TransactionModalProps) {
  const {
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
  } = useTransaction(mode);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => handleClose(onClose)}
        >
          <motion.div
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            exit={{ scale: 0.95, y: 20 }}
            initial={{ scale: 0.95, y: 20 }}
            transition={{ damping: 25, stiffness: 300, type: 'spring' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <CloseButton onClick={() => handleClose(onClose)} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <TransactionForm
                address={address}
                amount={amount}
                isDeposit={isDeposit}
                onAddressChange={setAddress}
                onAmountChange={setAmount}
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
