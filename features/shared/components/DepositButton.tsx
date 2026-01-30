import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

interface DepositButtonProps {
  onDeposit: () => void;
}

export function DepositButton({ onDeposit }: DepositButtonProps) {
  return (
    <motion.button
      drag
      className="flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-medium leading-[18px] tracking-[-0.02em] text-white" style={{backgroundColor: '#FF5100'}}
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      dragElastic={0.1}
      whileDrag={{ rotate: 2, scale: 1.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onDeposit}
    >
      <ArrowDownCircle className="h-5 w-5" />
      Deposit
    </motion.button>
  );
}
