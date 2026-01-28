import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  isDeposit: boolean;
  isPending: boolean;
  onSubmit?: () => void;
}

export function SubmitButton({
  isDeposit,
  isPending,
  onSubmit,
}: SubmitButtonProps) {
  return (
    <motion.button
      className={cn(
        'w-full rounded-2xl py-4 text-base font-semibold text-white transition-colors',
        isDeposit
          ? 'bg-orange-500 hover:bg-orange-600'
          : 'bg-gray-900 hover:bg-gray-800'
      )}
      disabled={isPending}
      onClick={onSubmit}
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isPending
        ? 'Processing...'
        : isDeposit
          ? 'Confirm Deposit'
          : 'Confirm Withdrawal'}
    </motion.button>
  );
}
