
import { useState, type FormEvent } from "react";

type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY";
type TimeFormat = "12-hour" | "24-hour";

interface Preferences {
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  appointmentReminders: boolean;
}

const STORAGE_KEY = "mediflow-preferences";

const DEFAULT_PREFERENCES: Preferences = {
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24-hour",
  appointmentReminders: true,
};

const PreferencesSettings = () => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const storedPreferences = localStorage.getItem(STORAGE_KEY);

      if (storedPreferences) {
        const parsed: unknown = JSON.parse(storedPreferences);

        if (parsed && typeof parsed === "object") {
          const value = parsed as Record<string, unknown>;

          return {
            dateFormat:
              value.dateFormat === "MM/DD/YYYY"
                ? "MM/DD/YYYY"
                : "DD/MM/YYYY",
            timeFormat:
              value.timeFormat === "12-hour" ? "12-hour" : "24-hour",
            appointmentReminders:
              typeof value.appointmentReminders === "boolean"
                ? value.appointmentReminders
                : true,
          };
        }
      }
    } catch {
      // If stored data is invalid, keep the default preferences.
    }

    return DEFAULT_PREFERENCES;
  });

  const [saved, setSaved] = useState(false);

  const updatePreference = <K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      setSaved(true);
    } catch {
      setSaved(false);
      window.alert(
        "Unable to save preferences in this browser. Please check your browser storage settings."
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-7">
        <h2 className="text-xl font-bold text-[#212529]">
          Preferences
        </h2>
        <p className="mt-1 text-sm text-[#5B6268]">
          Customize how information is displayed in your workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Date format */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label
              htmlFor="date-format"
              className="block text-sm font-semibold text-[#212529]"
            >
              Date format
            </label>
            <p className="mt-1 text-sm text-[#5B6268]">
              Choose how dates appear throughout the application.
            </p>
          </div>

          <select
            id="date-format"
            value={preferences.dateFormat}
            onChange={(event) =>
              updatePreference(
                "dateFormat",
                event.target.value as DateFormat
              )
            }
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-sm text-[#212529] outline-none focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 sm:max-w-52"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>
        </div>

        <div className="border-t border-[#E5E0D5]" />

        {/* Time format */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label
              htmlFor="time-format"
              className="block text-sm font-semibold text-[#212529]"
            >
              Time format
            </label>
            <p className="mt-1 text-sm text-[#5B6268]">
              Choose between a 12-hour or 24-hour clock.
            </p>
          </div>

          <select
            id="time-format"
            value={preferences.timeFormat}
            onChange={(event) =>
              updatePreference(
                "timeFormat",
                event.target.value as TimeFormat
              )
            }
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-sm text-[#212529] outline-none focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 sm:max-w-52"
          >
            <option value="12-hour">12-hour (2:30 PM)</option>
            <option value="24-hour">24-hour (14:30)</option>
          </select>
        </div>

        <div className="border-t border-[#E5E0D5]" />

        {/* Appointment reminders */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#212529]">
              Appointment reminders
            </p>
            <p className="mt-1 text-sm text-[#5B6268]">
              Enable reminders for upcoming appointments.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.appointmentReminders}
            aria-label="Appointment reminders"
            onClick={() =>
              updatePreference(
                "appointmentReminders",
                !preferences.appointmentReminders
              )
            }
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71] ${
              preferences.appointmentReminders
                ? "bg-[#3C6E71]"
                : "bg-[#C9C6BE]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                preferences.appointmentReminders
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {saved && (
          <p
            role="status"
            className="rounded-lg border border-[#B7D8CC] bg-[#EDF7F2] px-4 py-3 text-sm text-[#28634F]"
          >
            Preferences saved successfully.
          </p>
        )}

        <div className="flex justify-end border-t border-[#E5E0D5] pt-5">
          <button
            type="submit"
            className="rounded-lg bg-[#3C6E71] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#31595C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71]"
          >
            Save preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesSettings;
