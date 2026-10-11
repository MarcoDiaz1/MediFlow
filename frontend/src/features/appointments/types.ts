export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface Appointment {
  id: number;
  patientId: number;
  scheduledAt: string;
  reason: string | null;
  status: AppointmentStatus;
  patient: {
    firstName: string;
    lastName: string;
  };
}
export type CalendarView = "Month" | "Week" | "Day" | "List";

export type FullCalendarView =
  | "dayGridMonth"
  | "timeGridWeek"
  | "timeGridDay"
  | "listWeek";

export interface CreateAppointmentPayload {
  patientId: number;
  scheduledAt: string;
  reason?: string;
}