import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import type { Appointment } from "../types";

interface AppointmentsCalendarProps {
  currentDate: Date;
  view: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek";
  appointments: Appointment[];
}

const AppointmentsCalendar = ({
  currentDate,
  view,
  appointments,
}: AppointmentsCalendarProps) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const events = appointments.map((appointment) => ({
    id: String(appointment.id),
    title: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    start: appointment.scheduledAt,
    backgroundColor:
      appointment.status === "CANCELLED"
        ? "#F8E3E3"
        : appointment.status === "COMPLETED"
          ? "#DCEBE7"
          : "#3C6E71",
    borderColor: "transparent",
    textColor:
      appointment.status === "CANCELLED"
        ? "#9B3030"
        : appointment.status === "COMPLETED"
          ? "#245B4A"
          : "#FFFFFF",
    extendedProps: {
      reason: appointment.reason,
      status: appointment.status,
    },
  }));

  const handleEventClick = (info: EventClickArg) => {
    const appointment = appointments.find(
      (item) => String(item.id) === info.event.id,
    );

    if (appointment) {
      setSelectedAppointment(appointment);
    }
  };

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();

    if (!calendarApi) return;

    calendarApi.gotoDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();

    if (!calendarApi) return;

    calendarApi.changeView(view);
  }, [view]);

  return (
    <div className="min-h-0 w-full rounded-xl border border-[#E5E0D5] bg-[#F8F5ED] p-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={view}
        initialDate={currentDate}
        headerToolbar={false}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        nowIndicator
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:30:00"
      />

      {selectedAppointment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-title"
            className="w-full max-w-md rounded-xl border border-[#E5E0D5] bg-[#F8F5ED] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2
                  id="appointment-title"
                  className="text-lg font-bold text-[#212529]"
                >
                  Appointment details
                </h2>
                <p className="text-sm text-[#5B6268]">
                  {selectedAppointment.patient.firstName}{" "}
                  {selectedAppointment.patient.lastName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                aria-label="Close appointment details"
                className="rounded-lg px-3 py-1 text-[#5B6268] hover:bg-[#ECEAE4]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#212529]">
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(selectedAppointment.scheduledAt).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Reason:</span>{" "}
                {selectedAppointment.reason || "Not specified"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedAppointment.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsCalendar;
