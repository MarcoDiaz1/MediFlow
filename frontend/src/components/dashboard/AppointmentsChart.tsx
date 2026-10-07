import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AppointmentData {
  date: string;
  count: number;
}

interface AppointmentsChartProps {
  data: AppointmentData[];
}

const AppointmentsChart = ({ data }: AppointmentsChartProps) => {
  return (
    <div className="w-full h-full bg-[#DCEBE7] rounded-[10px] p-5">
      <div className="w-full h-full flex flex-col">
        <h2 className="text-lg font-bold text-[#20272B] mb-3">
          Appointments This Week
        </h2>

        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#3C6E71"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsChart;