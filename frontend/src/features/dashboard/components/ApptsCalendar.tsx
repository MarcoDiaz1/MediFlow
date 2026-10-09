import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { Appointment } from "../types";

const AppointmentCalendar = ({ appointments }: { appointments: Appointment[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const appointmentDates = appointments.map((appointment) => appointment.scheduledAt);

  return (
      <div className="flex flex-col h-full w-full bg-[#DCEBE7] rounded-[10px] p-3 overflow-hidden">
        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              hasAppointment: appointmentDates,
            }}
            modifiersClassNames={{
              hasAppointment: "appointment-day",
            }}
          />
        </div>
      </div>
  );
};

export default AppointmentCalendar;
