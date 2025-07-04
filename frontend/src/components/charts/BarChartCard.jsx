import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartWrapper from "./ChartWrapper";
import { BarChart as BarIcon } from "lucide-react";

export default function BarChartCard({ data }) {
  return (
    <ChartWrapper title="Bar Chart" icon={<BarIcon className="w-4 h-4" />}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
