import React, { useEffect } from "react";
import { getDashboardSummary } from "../features/dashboard/api/dashboard";
import TotalPatientsCard from "../features/dashboard/components/TotalPatientsCard";
import TotalApptCard from "../features/dashboard/components/TotalApptCard";
import TotalPendAppts from "../features/dashboard/components/TotalPendAppts";
import Appointments from "../features/dashboard/components/ApptsCalendar";
import AppointmentsChart from "../features/dashboard/components/AppointmentsChart";
import type { Appointment } from "../features/dashboard/types";
import UpcomingAppointments from "../features/dashboard/components/UpcomingAppointments";
import RecentActivity from "../features/dashboard/components/RecentActivity";
import { mockActivities } from "../data/mockActivities";
import TodayAppts from "../features/dashboard/components/TodayAppts";
import AppointmentStatus from "../features/dashboard/components/AppointmentStatus";
import { mockAppointmentStatus } from "../data/mockActivities";

const Dashboard = () => {
  const [appointmentsThisWeek, setAppointmentsThisWeek] = React.useState<
    { date: string; count: number }[]
  >([]);
  const [totalPatients, setTotalPatients] = React.useState<number | null>(null);
  const [patientGrowth, setPatientGrowth] = React.useState<number | null>(null);
  const [totalAppts, setTotalApptsments] = React.useState<number | null>(null);
  const [apptsToday, setApptsToday] = React.useState<number | null>(null);
  const [pendingAppts, setPendingAppts] = React.useState<Appointment[] | null>(
    null,
  );
  const appointments = [
    {
      id: 1,
      date: new Date(2026, 9, 5),
      scheduledAt: new Date(2026, 9, 5, 9, 0),
      status: "confirmed",
      time: "09:00",
      patient: { firstName: "John", lastName: "Smith" },
      reason: "Routine checkup",
    },
    {
      id: 2,
      date: new Date(2026, 9, 5),
      scheduledAt: new Date(2026, 9, 5, 10, 30),
      status: "confirmed",
      time: "10:30",
      patient: { firstName: "Maria", lastName: "Lopez" },
      reason: "Follow-up consultation",
    },
    {
      id: 3,
      date: new Date(2026, 9, 6),
      scheduledAt: new Date(2026, 9, 6, 13, 0),
      status: "confirmed",
      time: "13:00",
      patient: { firstName: "James", lastName: "Brown" },
      reason: "Annual examination",
    },
  ];

  useEffect(() => {
    const fetchTotalPatients = async () => {
      try {
        const data = await getDashboardSummary();
        setTotalPatients(data.totalPatients);
        setPatientGrowth(data.patientGrowth);
        setAppointmentsThisWeek(data.appointmentsThisWeek);
        setTotalApptsments(data.totalAppointments);
        setApptsToday(data.appointmentsToday);
        setPendingAppts(data.pendingAppointments);

        console.log(data);
      } catch (error) {
        console.error("Error fetching total patients:", error);
      }
    };
    fetchTotalPatients();
  }, []);

  return (
   
      <div className="w-full h-full flex flex-col p-[2vh_3vw] ">
        <div className="w-full h-auto flex">
          <div className="h-auto">
            <div className="w-full h-auto grid grid-cols-3 gap-4 pr-[2vw] pb-[2vh]">
              <TotalPatientsCard
                totalPatients={totalPatients}
                patientGrowth={patientGrowth}
              />
              <TotalApptCard
                totalAppointments={totalAppts}
                appointmentsToday={apptsToday}
              />
              <TotalPendAppts
                pendingAppointments={pendingAppts?.length || 0}
              />
            </div>
            <div className="h-[40vh] w-auto  grid grid-cols-2 gap-4 pr-[2vw]">
              <AppointmentsChart data={appointmentsThisWeek} />
              <UpcomingAppointments appointments={pendingAppts || []} />
            </div>
            <div className="grid grid-cols-2 gap-4 pr-[2vw] mt-4">
              <RecentActivity activities={mockActivities} />
              <TodayAppts appointments={appointments} />
              {/* Appointment Status will go here */}
            </div>
          </div>
          <div className="w-[25%] rounded-[10px] p-3 overflow-hidden grid grid-rows-2 gap-2">
            <Appointments appointments={appointments} />
             <AppointmentStatus data={mockAppointmentStatus} />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
