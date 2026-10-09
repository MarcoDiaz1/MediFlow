import type { Activity,  AppointmentStatusData} from "../features/dashboard/types";

const minutesAgo = (minutes: number) => {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
};

const hoursAgo = (hours: number) => {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
};

export const mockActivities: Activity[] = [
  {
    id: 1,
    type: "APPOINTMENT_COMPLETED",
    patientName: "John Smith",
    description: "Appointment completed",
    createdAt: minutesAgo(12),
  },
  {
    id: 2,
    type: "PATIENT_CREATED",
    patientName: "Maria Garcia",
    description: "New patient registered",
    createdAt: minutesAgo(35),
  },
  {
    id: 3,
    type: "APPOINTMENT_CREATED",
    patientName: "James Brown",
    description: "Appointment scheduled",
    createdAt: hoursAgo(1),
  },
  {
    id: 4,
    type: "APPOINTMENT_CANCELLED",
    patientName: "Sarah Wilson",
    description: "Appointment cancelled",
    createdAt: hoursAgo(2),
  },
  {
    id: 5,
    type: "PATIENT_CREATED",
    patientName: "Robert Johnson",
    description: "New patient registered",
    createdAt: hoursAgo(3),
  },
];

export const mockAppointmentStatus: AppointmentStatusData[] = [
  {
    status: "SCHEDULED",
    count: 12,
  },
  {
    status: "COMPLETED",
    count: 4,
  },
  {
    status: "CANCELLED",
    count: 2,
  },
];