import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ChartWrapper from "./ChartWrapper";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#9333ea'];

const pieData = [
  { name: "Sales", value: 35 },
  { name: "Marketing", value: 25 },
  { name: "Dev", value: 20 },
  { name: "Support", value: 10 },
  { name: "Others", value: 10 }
];

export default function PieChartCard() {
  return (
    <ChartWrapper title="Pie Chart" icon={<PieIcon className="w-4 h-4" />}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={60} label>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}


