import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CloseButtonProps {
  onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <motion.button
      className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <X size={20} />
    </motion.button>
  );
}
