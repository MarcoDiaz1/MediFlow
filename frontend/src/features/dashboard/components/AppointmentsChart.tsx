
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

interface AppointmentData {
  date: string;
  count: number;
}

interface AppointmentsChartProps {
  data: AppointmentData[];
}

const AppointmentsChart = ({ data }: AppointmentsChartProps) => {
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
                dataKey="date"
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
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentsChart;
