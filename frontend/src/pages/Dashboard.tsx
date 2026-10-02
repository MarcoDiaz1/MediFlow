import React from 'react'
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="w-full h-full flex items-center justify-center  rounded-x-lg rounded-b-lg bg-[#f2e8cf]">
      <div>
        Good day, <span className="font-bold">{user?.name ?? "User"}</span>!
      </div>
      
    </div>
  )
}

export default Dashboard