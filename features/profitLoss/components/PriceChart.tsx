'use client';

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
    <div className="mt-4 h-[87px] w-full">
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart
          data={data}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <defs>
            <linearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ff6b35" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis hide dataKey="date" />
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Tooltip
            content={() => null}
            cursor={{
              stroke: '#ff6b35',
              strokeDasharray: '4 4',
              strokeWidth: 1
            }}
          />
          <Area
            dataKey="value"
            fill="url(#orangeGradient)"
            stroke="#ff6b35"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
