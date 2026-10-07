interface AppointmentStatus {
  SCHEDULED: "SCHEDULED";
  COMPLETED: "COMPLETED";
  CANCELLED: "CANCELLED";
}

export interface Appointment {
  patientId: number;
  scheduledAt: Date;
  reason: string;
  status: AppointmentStatus;
}
