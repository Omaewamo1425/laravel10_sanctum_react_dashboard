import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LineChartCard from "@/components/charts/LineChartCard";
import BarChartCard from "@/components/charts/BarChartCard";
import AreaChartCard from "@/components/charts/AreaChartCard";
import PieChartCard from "@/components/charts/PieChartCard";
import DoughnutChartCard from "@/components/charts/DoughnutChartCard";
import RadarChartCard from "@/components/charts/RadarChartCard";

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setData([
        { name: "Jan", value: 400, uv: 2400, pv: 2400, budget: 30, actual: 20 },
        { name: "Feb", value: 600, uv: 1398, pv: 2210, budget: 40, actual: 35 },
        { name: "Mar", value: 800, uv: 9800, pv: 2290, budget: 50, actual: 45 },
        { name: "Apr", value: 700, uv: 3908, pv: 2000, budget: 60, actual: 55 },
        { name: "May", value: 900, uv: 4800, pv: 2181, budget: 70, actual: 65 },
      ]);
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">📊 Full Dashboard</h1>
        <div className="flex gap-2">
          <DatePicker selected={startDate} onChange={setStartDate} className="px-2 py-1 rounded border" />
          <span className="self-center">to</span>
          <DatePicker selected={endDate} onChange={setEndDate} className="px-2 py-1 rounded border" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <LineChartCard data={data} />
        <BarChartCard data={data} />
        <AreaChartCard data={data} />
        <PieChartCard />
        <DoughnutChartCard />
        <RadarChartCard data={data} />
      </div>
    </div>
  );
}
