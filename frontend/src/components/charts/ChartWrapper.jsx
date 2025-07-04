import React from "react";

export default function ChartWrapper({ title, icon, children }) {
  return (
    <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-6 transition-all">
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-primary">{icon}</div>}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
