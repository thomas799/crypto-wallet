import { Pencil, Wallet } from 'lucide-react';

import type { WalletData } from '../types';

interface WalletHeaderProps {
  wallet: WalletData;
}

export function WalletHeader({ wallet }: WalletHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{backgroundColor: 'rgba(255, 81, 0, 0.6)'}}>
        <Wallet className="h-4 w-4 text-white" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <span className="text-base font-medium leading-5 tracking-[-0.02em] text-black">My Wallet</span>
          <Pencil className="h-3.5 w-3.5 text-[#868686]" />
        </div>
        <span className="text-xs font-normal leading-[15px] tracking-[-0.02em] text-[#868686]">
          Joined {wallet.joinedDate}
        </span>
      </div>
    </div>
  );
}
