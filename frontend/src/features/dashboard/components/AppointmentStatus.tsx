import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { AppointmentStatusData } from "../types";

const AppointmentStatus = ({ data }: { data: AppointmentStatusData[] }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const getStatusLabel = (status: AppointmentStatusData["status"]) => {
    switch (status) {
      case "SCHEDULED":
        return "Scheduled";
      case "COMPLETED":
        return "Completed";
      case "CANCELLED":
        return "Cancelled";
    }
  };

  const statusColors = {
    SCHEDULED: "#174A7E",
    COMPLETED: "#397B7D",
    CANCELLED: "#C5284D",
  };

  return (
    <div className="h-[30vh] p-4 bg-[#DCEBE7] rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Appointment Status</h2>

      <div className="flex h-[calc(30vh-3.5rem)]">
        {/* Donut */}
        <div className="w-1/2 h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.status} fill={statusColors[entry.status]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold">{total}</span>
            <span className="text-xs text-gray-600">Appointments</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-1/2 flex flex-col justify-center gap-4">
          {data.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: statusColors[item.status],
                  }}
                />

                <span className="text-sm">{getStatusLabel(item.status)}</span>
              </div>

              <span className="font-semibold">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatus;
