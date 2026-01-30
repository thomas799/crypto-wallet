'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import type { ChartDataPoint } from '../types';

interface PriceChartProps {
  data: ChartDataPoint[];
  onHover: (point: ChartDataPoint | null) => void;
}

export function PriceChart({ data, onHover }: PriceChartProps) {
  const handleMouseMove = useCallback(
    (state: { activePayload?: { payload: ChartDataPoint }[] }) => {
      if (state?.activePayload?.[0]) {
        onHover(state.activePayload[0].payload);
      }
    },
    [onHover]
  );

  const handleMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  return (
    <div className="relative min-h-[88px] w-full flex-1">
      <Image
        src="/brand-icon.svg"
        alt=""
        width={30}
        height={20}
        className="absolute right-0 top-[-53px]"
      />
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart
          data={data}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <defs>
            <linearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="2%" stopColor="#FF5100" stopOpacity={0.2} />
              <stop offset="91%" stopColor="#FF5100" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis hide dataKey="date" />
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Tooltip
            content={() => null}
            cursor={{
              stroke: '#FF5100',
              strokeDasharray: '4 4',
              strokeWidth: 1
            }}
          />
          <Area
            dataKey="value"
            fill="url(#orangeGradient)"
            stroke="#FF5100"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
