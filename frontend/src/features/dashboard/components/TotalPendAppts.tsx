
import { MdOutlinePendingActions } from "react-icons/md";
import Card from "../../../components/ui/card";

interface TotalPendApptsProps {
  pendingAppointments: number | null;
}

const TotalPendAppts = ({
  pendingAppointments,
}: TotalPendApptsProps) => {
  return (
    <Card additionalClasses="w-full h-full bg-[#F8F5ED] border border-[#E5E0D5]">
      <div className="flex h-full w-full flex-col justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#B88632]">
            <MdOutlinePendingActions className="text-2xl text-white" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#5B6268]">
              Pending Appointments
            </p>

            <p className="text-2xl font-bold text-[#212529]">
              {pendingAppointments !== null
                ? pendingAppointments
                : "—"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#F5E9CC] px-3 py-1 text-sm font-semibold text-[#795719]">
            Awaiting action
          </span>

          <p className="text-sm text-[#5B6268]">
            {pendingAppointments === null
              ? "Loading appointment data..."
              : pendingAppointments === 0
                ? "All caught up"
                : pendingAppointments === 1
                  ? "1 appointment to review"
                  : `${pendingAppointments} appointments to review`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TotalPendAppts;
