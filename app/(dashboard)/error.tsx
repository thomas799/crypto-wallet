'use client';

import type { DashboardErrorContentProps } from 'features/dashboard/components/DashboardErrorContent';

import { DashboardErrorContent } from 'features/dashboard';
import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset
}: DashboardErrorContentProps) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return <DashboardErrorContent error={error} reset={reset} />;
}
