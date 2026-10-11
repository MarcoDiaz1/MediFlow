import { addDays, addMonths, format } from "date-fns";
import { LuSquareChevronLeft, LuSquareChevronRight } from "react-icons/lu";
import type { CalendarView } from "../types";

interface MonthChooserProps {
  currentDate: Date;
  view: CalendarView;
  onDateChange: (date: Date) => void;
}

const MonthChooser = ({
  currentDate,
  view,
  onDateChange,
}: MonthChooserProps) => {
  const navigate = (direction: -1 | 1) => {
    if (view === "Month") {
      onDateChange(addMonths(currentDate, direction));
    } else if (view === "Day") {
      onDateChange(addDays(currentDate, direction));
    } else {
      onDateChange(addDays(currentDate, direction * 7));
    }
  };

  const previousMonth = () => {
    onDateChange(addMonths(currentDate, -1));
  };

  const nextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label={`Previous ${view.toLowerCase()}`}
        className="rounded-lg p-2 text-[#5B6268] hover:bg-[#ECEAE4]"
      >
        <LuSquareChevronLeft className="text-xl" />
      </button>

      <div className="min-w-[150px] text-center">
        <h2 className="text-lg font-bold text-[#212529]">
          {view === "Day"
            ? format(currentDate, "d MMM yyyy")
            : `${format(currentDate, "d MMM")} – ${format(
                addDays(currentDate, 6),
                "d MMM yyyy",
              )}`}
        </h2>
      </div>

      <button
        type="button"
        onClick={() => navigate(1)}
        aria-label={`Next ${view.toLowerCase()}`}
        className="rounded-lg p-2 text-[#5B6268] hover:bg-[#ECEAE4]"
      >
        <LuSquareChevronRight className="text-xl" />
      </button>

      <button
        type="button"
        onClick={previousMonth}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={nextMonth}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default MonthChooser;
