import { motion } from 'framer-motion';
import { ArrowUpCircle } from 'lucide-react';

interface WithdrawButtonProps {
  onWithdraw: () => void;
}

export function WithdrawButton({ onWithdraw }: WithdrawButtonProps) {
  return (
    <motion.button
      className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white py-4 text-base font-semibold text-gray-900"
      drag
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      dragElastic={0.1}
      onClick={onWithdraw}
      whileDrag={{ rotate: -2, scale: 1.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <ArrowUpCircle className="h-5 w-5" />
      Withdraw
    </motion.button>
  );
}
