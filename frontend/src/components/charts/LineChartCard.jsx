import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartWrapper from "./ChartWrapper";
import { LineChart as LineIcon } from "lucide-react";

export default function LineChartCard({ data }) {
  return (
    <ChartWrapper title="Line Chart" icon={<LineIcon className="w-4 h-4" />}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}