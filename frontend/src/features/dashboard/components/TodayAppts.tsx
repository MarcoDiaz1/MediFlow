
import type { Appointment } from "../types";
import Card from "../../../components/ui/card";

const TodayAppts = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const selectedDate = new Date();

  const selectedAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = new Date(appointment.scheduledAt);

      return (
        !Number.isNaN(appointmentDate.getTime()) &&
        appointmentDate.toDateString() === selectedDate.toDateString()
      );
    })
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() -
        new Date(b.scheduledAt).getTime(),
    );

  return (
    <Card additionalClasses="w-full h-full min-h-0 bg-[#F8F5ED] border border-[#E5E0D5]">
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#212529]">
            Today's Schedule
          </h2>

          <p className="mt-1 text-sm text-[#5B6268]">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {selectedAppointments.length > 0 ? (
          <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {selectedAppointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex items-center gap-3 rounded-xl border border-[#E5E0D5] bg-white p-3 transition-colors hover:border-[#B8D0CB]"
              >
                <div className="flex min-w-[4.5rem] flex-col items-center justify-center rounded-lg bg-[#DCEBE7] px-2 py-3">
                  <span className="text-sm font-bold text-[#31595C]">
                    {new Date(appointment.scheduledAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[#212529]">
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-[#5B6268]">
                    {appointment.reason || "General consultation"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#D8D2C6] p-6">
            <p className="text-center text-sm text-[#5B6268]">
              No appointments scheduled for today.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TodayAppts;
