import React from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";
import ChartWrapper from "./ChartWrapper";
import { Radar as RadarIcon } from "lucide-react";

export default function RadarChartCard({ data }) {
  return (
    <ChartWrapper title="Radar Chart" icon={<RadarIcon className="w-4 h-4" />}>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar name="Budget" dataKey="budget" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
          <Radar name="Actual" dataKey="actual" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}