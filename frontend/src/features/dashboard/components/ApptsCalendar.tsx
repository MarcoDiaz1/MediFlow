import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import type { Appointment } from "../types";
import Card from "../../../components/ui/card";

const AppointmentCalendar = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const appointmentDates = useMemo(
    () =>
      appointments
        .map((appointment) => new Date(appointment.scheduledAt))
        .filter((date) => !Number.isNaN(date.getTime())),
    [appointments],
  );

  const selectedAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const date = new Date(appointment.scheduledAt);

      return (
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
      );
    });
  }, [appointments, selectedDate]);

  return (
    <Card additionalClasses="flex h-full min-h-0 w-full flex-col overflow-hidden border border-[#E5E0D5] bg-[#F8F5ED]">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-[#212529]">
          Appointment Calendar
        </h2>

        <p className="mt-1 text-sm text-[#5B6268]">
          Select a day to view its schedule
        </p>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) setSelectedDate(date);
          }}
          modifiers={{
            hasAppointment: appointmentDates,
          }}
          modifiersClassNames={{
            hasAppointment: "appointment-day",
          }}
          showOutsideDays
          className="mediflow-calendar"
        />
      </div>

      <div className="mt-2 border-t border-[#E5E0D5] pt-3">
        <p className="text-center text-sm font-semibold text-[#212529]">
          {selectedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p className="mt-1 text-center text-xs text-[#5B6268]">
          {selectedAppointments.length === 0
            ? "No appointments scheduled"
            : `${selectedAppointments.length} appointment${
                selectedAppointments.length === 1 ? "" : "s"
              } scheduled`}
        </p>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3C6E71]" />
          <span className="text-xs text-[#5B6268]">
            Scheduled appointments
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCalendar;
