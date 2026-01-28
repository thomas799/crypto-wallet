import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

interface DepositButtonProps {
  onDeposit: () => void;
}

export function DepositButton({ onDeposit }: DepositButtonProps) {
  return (
    <motion.button
      className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-base font-semibold text-white"
      drag
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      dragElastic={0.1}
      onClick={onDeposit}
      whileDrag={{ rotate: 2, scale: 1.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <ArrowDownCircle className="h-5 w-5" />
      Deposit
    </motion.button>
  );
}
