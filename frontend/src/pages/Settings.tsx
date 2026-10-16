
import { useState } from "react";
import SettingsTabs from "../features/settings/components/SettingsTabs";
import ProfileSettings from "../features/settings/components/ProfileSettings";
import SecuritySettings from "../features/settings/components/SecuritySettings";
import PreferencesSettings from "../features/settings/components/PreferencesSettings";
import ClinicSettings from "../features/settings/components/ClinicSettings";

export type SettingsTab =
  | "profile"
  | "clinic"
  | "preferences"
  | "security";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="w-full space-y-6 p-4 md:p-6 self-start">
      <header>
        <p className="text-sm font-medium tracking-wide text-[#3C6E71]">
          WORKSPACE / SETTINGS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#212529]">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[#5B6268]">
          Manage your account, clinic, and preferences.
        </p>
      </header>

      <SettingsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <section className="min-h-[300px] rounded-xl border border-[#E5E0D5] bg-white p-5 md:p-8">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "clinic" && <ClinicSettings />}
        {activeTab === "preferences" && <PreferencesSettings />}
        {activeTab === "security" && <SecuritySettings />}
      </section>
    </div>
  );
};

export default Settings;
