import { MdOutlinePendingActions } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import Card from "../ui/card";

import React from 'react'

interface TotalPendApptsProps {
  totalAppointments: number | null;
  pendingAppointments: number | null;
}

const TotalPendAppts = ({ totalAppointments, pendingAppointments }: TotalPendApptsProps) => {



  return (
    <Card additionalClasses="bg-[#DCEBE7] w-full h-full">
      <div className="flex flex-col justify-start items-start">
        <div className="flex items-center">
          <MdOutlinePendingActions className="bg-[#b92548] text-[#E8C878] text-[2.5vw] rounded-full p-3 mr-2" />

          <div className="font-bold text-[1vw] text-[#20272B] flex">
            <p>Total Pending Appointments:</p>

            <p className="ml-3">
              {totalAppointments !== null
                ? totalAppointments
                : "Loading..."}
            </p>
          </div>
        </div>

        <div className="w-full bg-[#b92548] my-2 p-2 px-3 rounded-full flex items-center">
          <FaFire className="mr-2 text-[#E8C878]" />

          <p className="font-bold text-white">
            {pendingAppointments !== null
              ? `${pendingAppointments >= 0 ? "+" : ""}${pendingAppointments} pending`
              : "Loading..."}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TotalPendAppts