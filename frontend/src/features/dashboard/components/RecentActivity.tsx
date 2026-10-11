import React from "react";
import type { Activity } from "../types";
import {
  FaUserPlus,
  FaCalendarCheck,
  FaCalendarPlus,
  FaCalendarXmark,
} from "react-icons/fa6";

const RecentActivity = ({ activities }: { activities: Activity[] }) => {
  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const activityDate = new Date(date);

    const difference = now.getTime() - activityDate.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    return `${days} days ago`;
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "PATIENT_CREATED":
        return <FaUserPlus />;

      case "APPOINTMENT_CREATED":
        return <FaCalendarPlus />;

      case "APPOINTMENT_COMPLETED":
        return <FaCalendarCheck />;

      case "APPOINTMENT_CANCELLED":
        return <FaCalendarXmark />;

      default:
        return null;
    }
  };

  return (
    <div className="h-[30vh] p-4 bg-[#F8F5ED]  rounded-lg overflow-y-scroll">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#212529]">Recent Activity</h2>

        <p className="mt-1 text-sm text-[#5B6268]">
          Latest updates from your clinic
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#D8D2C6] p-6">
          <p className="text-center text-sm text-[#5B6268]">
            No recent activity.
          </p>
        </div>
      ) : (
        <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start gap-3 rounded-xl border border-[#E5E0D5] bg-white p-3 transition-colors hover:border-[#B8D0CB]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCEBE7] text-[#31595C]">
                {getActivityIcon(activity.type)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#212529]">
                  {activity.patientName}
                </p>

                <p className="mt-0.5 text-sm text-[#5B6268]">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-[#7A8085]">
                  {formatRelativeTime(activity.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;
