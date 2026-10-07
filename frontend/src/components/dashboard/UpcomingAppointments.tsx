import React from 'react'
import type { Appointment } from '../../types'

const UpcomingAppointments = ({ appointments }: { appointments: Appointment[] }) => {
  return (
    <div className='h-[40vh] overflow-y-scroll p-2 bg-[#DCEBE7] rounded-lg'>
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul >
          {appointments.map((appointment, index) => (
            <li key={index} className="mb-2 bg-[#a2d2ff] p-2 rounded">
              <p>
                <strong>Date:</strong> {new Date(appointment.scheduledAt).toLocaleString()}
              </p>
              <p>
                <strong>Reason:</strong> {appointment.reason}
              </p>
              <p>
                <strong>Status:</strong> {String(appointment.status)}
              </p>
            </li>
          ))}
        </ul> 
      )}
    </div>
  )
}

export default UpcomingAppointments