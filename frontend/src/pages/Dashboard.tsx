import React, { useEffect } from "react";
import { getDashboardSummary } from "../api/dashboard";
import TotalPatientsCard from "../components/dashboard/TotalPatientsCard";
import TotalApptCard from "../components/dashboard/TotalApptCard";
import TotalPendAppts from "../components/dashboard/TotalPendAppts";
import Appointments from "../components/dashboard/ApptsCalendar";
import AppointmentsChart from "../components/dashboard/AppointmentsChart";
import type { Appointment } from "../types";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";


const Dashboard = () => {
  const [appointmentsThisWeek, setAppointmentsThisWeek] = React.useState<
    { date: string; count: number }[]
  >([]);
  const [totalPatients, setTotalPatients] = React.useState<number | null>(null);
  const [patientGrowth, setPatientGrowth] = React.useState<number | null>(null);
  const [totalAppts, setTotalApptsments] = React.useState<number | null>(null);
  const [apptsToday, setApptsToday] = React.useState<number | null>(null);
  const [pendingAppts, setPendingAppts] = React.useState<Appointment[] | null>(null);

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
    <div className="w-full h-full flex items-center justify-center  rounded-x-lg rounded-b-lg bg-[#F6F0DF]">
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
                totalAppointments={totalAppts}
                pendingAppointments={pendingAppts?.length || 0}
              />
            </div>
            <div className="h-[35vh] w-auto  grid grid-cols-2 gap-4 pr-[2vw]">
              <AppointmentsChart data={appointmentsThisWeek} />
              <UpcomingAppointments appointments={pendingAppts || []} />
            </div>
          </div>
          <Appointments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
