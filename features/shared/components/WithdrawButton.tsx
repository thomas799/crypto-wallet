import Image from 'next/image';
import { motion } from 'framer-motion';

interface WithdrawButtonProps {
  onWithdraw: () => void;
}

export function WithdrawButton({ onWithdraw }: WithdrawButtonProps) {
  return (
    <motion.button
      drag
      className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#E1E1E1] bg-[#F8F8F8] text-sm font-medium leading-[18px] tracking-[-0.02em] text-black"
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      dragElastic={0.1}
      whileDrag={{ rotate: -2, scale: 1.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onWithdraw}
    >
      <Image src="/arrow-up-icon.svg" alt="" width={20} height={20} />
      Withdraw
    </motion.button>
  );
}
