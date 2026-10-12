 
import React, { useEffect, useState } from "react";

import { getDashboardSummary } from "../features/dashboard/api/dashboard";

import TotalPatientsCard from "../features/dashboard/components/TotalPatientsCard";
import TotalApptCard from "../features/dashboard/components/TotalApptCard";
import TotalPendAppts from "../features/dashboard/components/TotalPendAppts";
import Appointments from "../features/dashboard/components/ApptsCalendar";
import AppointmentsChart from "../features/dashboard/components/AppointmentsChart";
import UpcomingAppointments from "../features/dashboard/components/UpcomingAppointments";
import RecentActivity from "../features/dashboard/components/RecentActivity";
import TodayAppts from "../features/dashboard/components/TodayAppts";
import AppointmentStatus from "../features/dashboard/components/AppointmentStatus";

import type { Appointment } from "../features/dashboard/types";
import { mockActivities, mockAppointmentStatus } from "../data/mockActivities";

interface AppointmentData {
  date: string;
  dayLabel: string;
  count: number;
}

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState<number | null>(null);
  const [patientGrowth, setPatientGrowth] = useState<number | null>(null);
  const [totalAppts, setTotalAppts] = useState<number | null>(null);
  const [apptsToday, setApptsToday] = useState<number | null>(null);

  const [pendingAppts, setPendingAppts] = useState<Appointment[]>([]);
  const [appointmentsThisWeek, setAppointmentsThisWeek] = useState<
    AppointmentData[]
  >([]);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const data = await getDashboardSummary();

        setTotalPatients(data.totalPatients);
        setPatientGrowth(data.patientGrowth);
        setTotalAppts(data.totalAppointments);
        setApptsToday(data.appointmentsToday);
        setPendingAppts(data.pendingAppointments);
        setAppointmentsThisWeek(
          data.appointmentsThisWeek.map((appointment) => ({
            ...appointment,
            dayLabel: new Date(appointment.date).toLocaleDateString("en-US", {
              weekday: "short",
            }),
          })),
        );
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchDashboardSummary();
  }, []);

  return (
    <div className="flex h-full w-full flex-col p-[2vh_3vw]">
      <div className="flex h-full w-full gap-4">
        {/* Main dashboard content */}
        <div className="min-w-0 flex-1">
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 pb-[2vh] sm:grid-cols-2 xl:grid-cols-3">
            <TotalPatientsCard
              totalPatients={totalPatients}
              patientGrowth={patientGrowth}
            />

            <TotalApptCard
              totalAppointments={totalAppts}
              appointmentsToday={apptsToday}
            />

            <TotalPendAppts
              pendingAppointments={pendingAppts.length}
            />
          </div>

          {/* Weekly appointments and upcoming appointments */}
          <div className="grid h-[40vh] min-h-[300px] grid-cols-1 gap-4 lg:grid-cols-2">
            <AppointmentsChart data={appointmentsThisWeek} />

            <UpcomingAppointments appointments={pendingAppts} />
          </div>

          {/* Activity and today's appointments */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RecentActivity activities={mockActivities} />

            <TodayAppts appointments={pendingAppts} />
          </div>
        </div>

        {/* Right sidebar widgets */}
        <aside className="hidden w-[25%] min-w-[240px] grid-rows-2 gap-3 overflow-hidden rounded-[10px] p-3 lg:grid">
          <Appointments appointments={pendingAppts} />

          <AppointmentStatus data={mockAppointmentStatus} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
