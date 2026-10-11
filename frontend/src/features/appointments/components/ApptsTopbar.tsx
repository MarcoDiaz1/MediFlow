import MonthChooser from "./MonthChooser";
import { LuPlus } from "react-icons/lu";
import type { CalendarView } from "../types";

interface ApptsTopbarProps {
  currentDate: Date;
  view: CalendarView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  onNewAppointment: () => void;
}

const ApptsTopbar = ({
  currentDate,
  view,
  onDateChange,
  onViewChange,
  onNewAppointment,
}: ApptsTopbarProps) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E5E0D5] bg-[#F8F5ED] p-4">
      <MonthChooser
        currentDate={currentDate}
        view={view}
        onDateChange={onDateChange}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onNewAppointment}
          className="inline-flex items-center gap-2 rounded-lg bg-[#212529] px-4 py-2.5 text-sm font-semibold text-[#F2E8CF] hover:bg-[#3C6E71]"
        >
          <LuPlus className="text-lg" />
          New Appointment
        </button>

        <div className="flex items-center rounded-lg border border-[#E5E0D5] bg-white p-1">
          {(["Month", "Week", "Day", "List"] as CalendarView[]).map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() => onViewChange(option)}
                aria-pressed={view === option}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  view === option
                    ? "bg-[#DCEBE7] text-[#245B4A] shadow-sm"
                    : "text-[#5B6268] hover:bg-[#F8F5ED]"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ApptsTopbar;
