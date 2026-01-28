import { useState } from 'react';

import type { ModalType } from '../types';

export function useDashboardContent() {
  const [modal, setModal] = useState<ModalType>(null);

  const openDeposit = () => setModal('deposit');
  const openWithdraw = () => setModal('withdraw');
  const closeModal = () => setModal(null);

  return {
    closeModal,
    modal,
    openDeposit,
    openWithdraw
  };
}
