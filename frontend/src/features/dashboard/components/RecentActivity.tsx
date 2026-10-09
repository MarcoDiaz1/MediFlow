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
    <div className="h-[20vh] p-4 bg-[#DCEBE7] rounded-lg overflow-y-scroll">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-600">
          No recent activity.
        </p>
      ) : (
        <div className="space-y-3  h-auto pr-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#174A7E] text-white flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm">
                  {activity.patientName}
                </p>

                <p className="text-sm text-gray-700">
                  {activity.description}
                </p>

                <p className="text-xs text-gray-500 mt-0.5">
                  {formatRelativeTime(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;