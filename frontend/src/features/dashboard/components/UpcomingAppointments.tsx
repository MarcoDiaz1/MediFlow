import React from "react";
import type { Appointment } from "../types";

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
    <div className="h-auto overflow-y-auto p-2 bg-[#DCEBE7] rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Upcoming Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-sm text-gray-600">
          No upcoming appointments.
        </p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex gap-3 bg-[#a2d2ff] p-3 rounded-lg"
            >
              {/* Time */}
              <div className="w-16 shrink-0">
                <p className="font-semibold text-sm">
                  {formatTime(appointment.scheduledAt)}
                </p>
              </div>

              {/* Appointment information */}
              <div className="min-w-0">
                <p className="font-semibold">
                  {appointment.patient.firstName}{" "}
                  {appointment.patient.lastName}
                </p>

                <p className="text-sm text-gray-700">
                  {appointment.reason}
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  {getDayLabel(appointment.scheduledAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingAppointments;