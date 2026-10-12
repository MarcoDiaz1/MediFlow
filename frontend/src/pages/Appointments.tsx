import { useEffect, useState } from "react";
import ApptsTopbar from "../features/appointments/components/ApptsTopbar";
import AppointmentsCalendar from "../features/appointments/components/AppointmentsCalendar";
import {
  createAppointment,
  getAppointments,
} from "../features/appointments/api/appointments";
import type {
  CalendarView,
  FullCalendarView,
  Appointment,
  CreateAppointmentPayload,
} from "../features/appointments/types";
import AddAppointmentModal from "../features/appointments/components/AddAppointmentModal";
import { useSearchParams } from "react-router-dom";

const Appointments = () => {
  const [view, setView] = useState<CalendarView>("Week");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const calendarViews: Record<CalendarView, FullCalendarView> = {
    Month: "dayGridMonth",
    Week: "timeGridWeek",
    Day: "timeGridDay",
    List: "listWeek",
  };

  const calendarView = calendarViews[view];

  const handleCreateAppointment = async (data: CreateAppointmentPayload) => {
    const createdAppointment = await createAppointment(data);

    setAppointments((previous) =>
      [...previous, createdAppointment].sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      ),
    );

    setIsAddModalOpen(false);
  };

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
        setError(null);
      } catch (error) {
        console.error("Error loading appointments:", error);
        setError("Unable to load appointments.");
      }
    };

    loadAppointments();
  }, []);

  const [currentDate, setCurrentDate] = useState(() => {
    const dateParam = searchParams.get("date");

    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      const [year, month, day] = dateParam.split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);

      if (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
      ) {
        return parsedDate;
      }
    }

    return new Date();
  });

  return (
    <div className="flex h-full w-full flex-col gap-4 p-[2vh_3vw]">
      <ApptsTopbar
        currentDate={currentDate}
        view={view}
        onDateChange={setCurrentDate}
        onViewChange={setView}
        onNewAppointment={() => setIsAddModalOpen(true)}
      />

      <AppointmentsCalendar
        currentDate={currentDate}
        view={calendarView}
        appointments={appointments}
      />
      {isAddModalOpen && (
        <AddAppointmentModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreateAppointment}
        />
      )}
      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Appointments;
