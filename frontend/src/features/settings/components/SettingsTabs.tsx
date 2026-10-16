
import {
  FaRegUser,
  FaHospitalUser,
} from "react-icons/fa";
import {
  MdOutlineRoomPreferences,
  MdOutlineSecurity,
} from "react-icons/md";
import type { IconType } from "react-icons";
import type { SettingsTab } from "../../../pages/Settings";

interface TabItem {
  id: SettingsTab;
  label: string;
  icon: IconType;
}

const tabs: TabItem[] = [
  { id: "profile", label: "Profile", icon: FaRegUser },
  { id: "clinic", label: "Clinic", icon: FaHospitalUser },
  {
    id: "preferences",
    label: "Preferences",
    icon: MdOutlineRoomPreferences,
  },
  { id: "security", label: "Security", icon: MdOutlineSecurity },
];

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const SettingsTabs = ({
  activeTab,
  onTabChange,
}: SettingsTabsProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      role="group"
      aria-label="Settings sections"
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            aria-pressed={isActive}
            className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71] ${
              isActive
                ? "border-[#3C6E71] bg-[#DCEBE7] text-[#31595C]"
                : "border-[#E5E0D5] bg-white text-[#5B6268] hover:border-[#3C6E71] hover:bg-[#F8F5ED]"
            }`}
          >
            <Icon size={23} aria-hidden="true" />
            <span className="text-sm font-semibold">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SettingsTabs;
