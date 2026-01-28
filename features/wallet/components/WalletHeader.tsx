import { Pencil, Wallet } from 'lucide-react';

import type { WalletData } from '../types';

interface WalletHeaderProps {
  wallet: WalletData;
}

export function WalletHeader({ wallet }: WalletHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
        <Wallet className="h-5 w-5 text-white" />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900">My Wallet</span>
        <Pencil className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <span className="ml-auto text-sm text-gray-400">
        Joined {wallet.joinedDate}
      </span>
    </div>
  );
}
