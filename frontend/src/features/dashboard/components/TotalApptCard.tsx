import { useNavigate } from "react-router-dom";
import { LuCalendarPlus2 } from "react-icons/lu";
import Card from "../../../components/ui/card";

interface TotalApptCardProps {
  totalAppointments: number | null;
  appointmentsToday: number | null;
}

const TotalApptCard = ({
  totalAppointments,
  appointmentsToday,
}: TotalApptCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/appointments")}
      aria-label="View all patients"
      className="h-full w-full rounded-xl text-left
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[#3C6E71] cursor-pointer"
    >
      <Card additionalClasses="w-full h-full bg-[#F8F5ED] border border-[#E5E0D5]">
        <div className="flex h-full w-full flex-col justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3C6E71]">
              <LuCalendarPlus2 className="text-2xl text-white" />
            </div>

            <div>
              <p className="text-sm font-medium text-[#5B6268]">
                Total Appointments
              </p>

              <p className="text-2xl font-bold text-[#212529]">
                {totalAppointments !== null ? totalAppointments : "—"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#DCEBE7] px-3 py-1 text-sm font-semibold text-[#245B4A]">
              <LuCalendarPlus2 />
              Today
            </span>

            <p className="text-sm text-[#5B6268]">
              {appointmentsToday !== null
                ? `${appointmentsToday} scheduled`
                : "Loading appointment data..."}
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
};

export default TotalApptCard;
