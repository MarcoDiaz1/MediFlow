import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const appointments = [
    {
      id: 1,
      date: new Date(2026, 9, 5),
      time: "09:00",
      patient: "John Smith",
      reason: "Routine checkup",
    },
    {
      id: 2,
      date: new Date(2026, 9, 5),
      time: "10:30",
      patient: "Maria Lopez",
      reason: "Follow-up consultation",
    },
    {
      id: 3,
      date: new Date(2026, 9, 6),
      time: "13:00",
      patient: "James Brown",
      reason: "Annual examination",
    },
  ];

  const selectedAppointments = appointments.filter(
    (appointment) =>
      selectedDate &&
      appointment.date.toDateString() === selectedDate.toDateString(),
  );

  const appointmentDates = appointments.map((appointment) => appointment.date);

  return (
    <div className="w-[20%] h-full bg-[#DCEBE7] rounded-[10px] p-3 overflow-hidden">
      <div className="flex flex-col h-full">
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

        <div className="border-t border-[#3C6E71]/20 mt-2 pt-3 flex-1 overflow-y-auto">
          <h3 className="font-bold text-[#20272B] mb-2">
            {selectedDate
              ? selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })
              : "Select a date"}
          </h3>

          {selectedAppointments.length > 0 ? (
            <div className="flex flex-col gap-2">
              {selectedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-3 bg-[#F6F0DF] rounded-lg p-2"
                >
                  <span className="font-bold text-[#3C6E71]">
                    {appointment.time}
                  </span>

                  <div>
                    <p className="font-semibold text-[#20272B]">
                      {appointment.patient}
                    </p>

                    <p className="text-sm text-[#20272B]/70">
                      {appointment.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#20272B]/60">
              No appointments for this day.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
