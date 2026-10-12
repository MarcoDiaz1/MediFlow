import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "../types";
import Card from "../../../components/ui/card";

const UpcomingAppointments = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const navigate = useNavigate();

  const upcomingAppointments = useMemo(() => {
    const now = new Date();

    return appointments
      .filter((appointment) => {
        const date = new Date(appointment.scheduledAt);

        return (
          !Number.isNaN(date.getTime()) &&
          date >= now &&
          appointment.status === "SCHEDULED"
        );
      })
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() -
          new Date(b.scheduledAt).getTime(),
      )
      .slice(0, 5);
  }, [appointments]);

  const formatTime = (date: string | Date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getDayLabel = (date: string | Date) => {
    const appointmentDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentDay = new Date(appointmentDate);
    appointmentDay.setHours(0, 0, 0, 0);

    if (appointmentDay.getTime() === today.getTime()) {
      return "Today";
    }

    if (appointmentDay.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }

    return appointmentDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card additionalClasses="h-full min-h-0 w-full border border-[#E5E0D5] bg-[#F8F5ED]">
      <div className="flex h-full min-h-0 w-full flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#212529]">
            Upcoming Appointments
          </h2>

          <p className="mt-1 text-sm text-[#5B6268]">
            Your next scheduled visits
          </p>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#D8D2C6] p-6">
            <p className="text-center text-sm text-[#5B6268]">
              No upcoming appointments.
            </p>
          </div>
        ) : (
          <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {upcomingAppointments.map((appointment) => (
              <li key={appointment.id}>
                <button
                  type="button"
                  onClick={() => {
                    const date = new Date(appointment.scheduledAt);
                    const isoDate = [
                      date.getFullYear(),
                      String(date.getMonth() + 1).padStart(2, "0"),
                      String(date.getDate()).padStart(2, "0"),
                    ].join("-");

                    navigate(
                      `/appointments?date=${encodeURIComponent(isoDate)}`,
                    );
                  }}
                  className="flex w-full gap-3 rounded-xl border border-[#E5E0D5] bg-white p-3 text-left transition-colors hover:border-[#B8D0CB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71]"
                >
                  <div className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-lg bg-[#DCEBE7] px-2 py-3">
                    <span className="text-sm font-bold text-[#31595C]">
                      {formatTime(appointment.scheduledAt)}
                    </span>

                    <span className="mt-1 text-xs font-medium text-[#5B6268]">
                      {getDayLabel(appointment.scheduledAt)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 self-center">
                    <p className="truncate font-semibold text-[#212529]">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm text-[#5B6268]">
                      {appointment.reason || "General consultation"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-start pt-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-[#3C6E71]"
                      title="Scheduled"
                      aria-label="Scheduled"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default UpcomingAppointments;
