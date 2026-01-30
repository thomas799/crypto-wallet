import Image from 'next/image';

import type { WalletData } from '../types';

interface WalletHeaderProps {
  wallet: WalletData;
}

export function WalletHeader({ wallet }: WalletHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/avatar-image.svg"
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <span className="text-base font-medium leading-5 tracking-[-0.02em] text-black">My Wallet</span>
          <Image src="/pencil-icon.svg" alt="" width={14} height={14} />
        </div>
        <span className="text-xs font-normal leading-[15px] tracking-[-0.02em] text-[#868686]">
          Joined {wallet.joinedDate}
        </span>
      </div>
    </div>
  );
}
