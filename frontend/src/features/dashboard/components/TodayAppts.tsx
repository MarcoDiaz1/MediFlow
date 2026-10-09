import type { Appointment } from "../types";

const TodayAppts = ({ appointments }: { appointments: Appointment[] }) => {
  const selectedDate = new Date();
  const selectedAppointments = appointments.filter(
    (appointment) =>
      selectedDate &&
      appointment.scheduledAt.toDateString() === selectedDate.toDateString(),
  );

  return (
    <div className="border-t border-[#3C6E71]/20 mt-2 pt-3 flex-1 overflow-y-auto bg-[#DCEBE7] rounded-[10px] p-3">
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
                {appointment.scheduledAt.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <div>
                <p className="font-semibold text-[#20272B]">
                  {appointment.patient.firstName} {appointment.patient.lastName}    
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
  );
};

export default TodayAppts;
