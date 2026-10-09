export interface DashboardSummary {
  totalPatients: number;
  patientsLast7Days: number;
  patientsPrevious7Days: number;
  patientGrowth: number;
  appointmentsToday: number;
  totalAppointments: number;
  pendingAppointments: Appointment[];

  appointmentsThisWeek: {
    date: string;
    count: number;
  }[];
}

export type AppointmentStatusData = {
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  count: number;
};

export interface Appointment {
  id: number;
  scheduledAt: Date;
  reason: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

export type Activity = {
  id: number;
  type:
    | "PATIENT_CREATED"
    | "APPOINTMENT_CREATED"
    | "APPOINTMENT_COMPLETED"
    | "APPOINTMENT_CANCELLED";
  description: string;
  createdAt: string;
  patientName?: string;
};
