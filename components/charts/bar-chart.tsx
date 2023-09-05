"use client";

import {
  Bar,
  BarChart as RechartBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: any[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartBarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </RechartBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
