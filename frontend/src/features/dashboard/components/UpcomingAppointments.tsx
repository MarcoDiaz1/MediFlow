
import React from "react";
import type { Appointment } from "../types";
import Card from "../../../components/ui/card";

const UpcomingAppointments = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const formatTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    <Card additionalClasses="w-full h-full min-h-0 bg-[#F8F5ED] border border-[#E5E0D5]">
      <div className="flex h-full min-h-0 flex-col w-full">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#212529]">
            Upcoming Appointments
          </h2>

          <p className="mt-1 text-sm text-[#5B6268]">
            Your next scheduled visits
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#D8D2C6] p-6">
            <p className="text-center text-sm text-[#5B6268]">
              No upcoming appointments.
            </p>
          </div>
        ) : (
          <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex gap-3 rounded-xl border border-[#E5E0D5] bg-white p-3 transition-colors hover:border-[#B8D0CB]"
              >
                {/* Appointment time */}
                <div className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-lg bg-[#DCEBE7] px-2 py-3">
                  <span className="text-sm font-bold text-[#31595C]">
                    {formatTime(appointment.scheduledAt)}
                  </span>

                  <span className="mt-1 text-xs font-medium text-[#5B6268]">
                    {getDayLabel(appointment.scheduledAt)}
                  </span>
                </div>

                {/* Appointment information */}
                <div className="min-w-0 flex-1 self-center">
                  <p className="truncate font-semibold text-[#212529]">
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-[#5B6268]">
                    {appointment.reason || "General consultation"}
                  </p>
                </div>

                {/* Status indicator */}
                <div className="flex shrink-0 items-start pt-1">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-[#3C6E71]"
                    title="Scheduled"
                    aria-label="Scheduled"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default UpcomingAppointments;
