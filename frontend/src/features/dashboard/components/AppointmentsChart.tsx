import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "../../../components/ui/card";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface AppointmentData {
  date: string; // "2026-10-11"
  dayLabel: string; // "Sun"
  count: number;
}

interface AppointmentsChartProps {
  data: AppointmentData[];
}

const AppointmentsChart = ({ data }: AppointmentsChartProps) => {
  const navigate = useNavigate();

  const handleBarClick = (entry: { payload?: AppointmentData }) => {
    const date = entry.payload?.date;

    if (!date) return;

    navigate(`/appointments?date=${encodeURIComponent(date)}`);
  };

  const hasAppointments = data.some((day) => day.count > 0);

  return (
    <Card additionalClasses="w-full h-full min-h-0 bg-[#F8F5ED] border border-[#E5E0D5]">
      <div className="flex h-full w-full min-h-0 flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#212529]">
            Appointments This Week
          </h2>
          <p className="mt-1 text-sm text-[#5B6268]">
            Scheduled appointments by day
          </p>
        </div>

        <div className="min-h-0 flex-1">
          {hasAppointments ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#E5E0D5"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="dayLabel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#5B6268", fontSize: 12 }}
                  tickMargin={10}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#5B6268", fontSize: 12 }}
                  width={35}
                />

                <Tooltip
                  cursor={{ fill: "#ECEAE4", opacity: 0.6 }}
                  contentStyle={{
                    backgroundColor: "#F8F5ED",
                    border: "1px solid #E5E0D5",
                    borderRadius: "10px",
                    color: "#212529",
                    boxShadow: "0 4px 12px rgba(33, 37, 41, 0.08)",
                  }}
                  labelStyle={{
                    color: "#212529",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    color: "#3C6E71",
                    fontWeight: 500,
                  }}
                  formatter={(value) => [value, "Appointments"]}
                />

                <Bar
                  dataKey="count"
                  name="Appointments"
                  fill="#3C6E71"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={42}
                  cursor="pointer"
                  onClick={(entry) => handleBarClick(entry)}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#D8D2C6] bg-white/60 px-5 py-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#DCEBE7] text-[#3C6E71]">
                <FaCalendarCheck size={22} />
              </div>

              <h3 className="text-sm font-semibold text-[#212529]">
                No appointments this week
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-5 text-[#5B6268]">
                Your schedule is clear for now. New appointments will appear
                here throughout the week.
              </p>

              <button
                type="button"
                onClick={() => navigate("/appointments")}
                className="mt-4 rounded-lg bg-[#3C6E71] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#31595C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71]"
              >
                View appointments
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AppointmentsChart;
