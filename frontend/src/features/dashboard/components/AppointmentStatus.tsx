import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { AppointmentStatusData } from "../types";
import Card from "../../../components/ui/card";

const AppointmentStatus = ({
  data,
}: {
  data: AppointmentStatusData[];
}) => {
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

  const statusColors: Record<AppointmentStatusData["status"], string> = {
    SCHEDULED: "#3C6E71",
    COMPLETED: "#7A9E7E",
    CANCELLED: "#C76D6D",
  };

  return (
    <Card additionalClasses="h-full min-h-0 w-full border border-[#E5E0D5] bg-[#F8F5ED]">
      <div className="flex w-full h-full min-h-0 flex-col">
        <div className="mb-3">
          <h2 className="text-lg font-bold text-[#212529]">
            Appointment Status
          </h2>

          <p className="mt-1 text-sm text-[#5B6268]">
            Overview of all appointments
          </p>
        </div>

        <div className="flex min-h-0 flex-1 items-center">
          {/* Donut chart */}
          <div className="relative h-full min-h-0 w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="82%"
                  paddingAngle={3}
                  stroke="none"
                  cornerRadius={4}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={statusColors[entry.status]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#212529]">
                {total}
              </span>
              <span className="text-center text-xs text-[#5B6268]">
                Appointments
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex w-1/2 flex-col gap-3 pl-2">
            {data.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between gap-2 rounded-lg border border-[#E5E0D5] bg-white px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: statusColors[item.status],
                    }}
                  />

                  <span className="truncate text-sm text-[#5B6268]">
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <span className="font-bold tabular-nums text-[#212529]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentStatus;
