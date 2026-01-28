import { useQuery } from '@tanstack/react-query';

import type { WalletData } from '../types';

import { getWalletData } from '../actions';

export interface UseWalletReturn {
  wallet: WalletData;
}

export function useWallet(initialData: WalletData): UseWalletReturn {
  const { data } = useQuery({
    initialData,
    queryFn: () => getWalletData(),
    queryKey: ['walletData'],
    refetchInterval: 60_000
  });

  const wallet = data ?? initialData;

  return { wallet };
}
