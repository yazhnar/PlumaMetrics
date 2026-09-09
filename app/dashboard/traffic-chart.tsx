'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TrafficChart({ data }: { data: { hour: string; visitors: number }[] }) {
  return (
    <div className="bg-panel border border-panel-border rounded p-4 mb-10">
      <div className="text-muted text-sm mb-4">visitors_by_hour --last-24h</div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2b26" />
          <XAxis dataKey="hour" stroke="#5c7a6b" fontSize={12} tickLine={false} />
          <YAxis stroke="#5c7a6b" fontSize={12} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: '#131a17',
              border: '1px solid #1f2b26',
              borderRadius: 4,
              fontFamily: 'var(--font-jetbrains-mono)',
            }}
            labelStyle={{ color: '#d6e8dc' }}
            itemStyle={{ color: '#39ff14' }}
          />
          <Line type="monotone" dataKey="visitors" stroke="#39ff14" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}