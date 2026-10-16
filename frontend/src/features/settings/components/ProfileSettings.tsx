
import { useState, type FormEvent } from "react";
import { useAuth } from "../../../context/useAuth";
import { updateProfile } from "../api/settings";

const ProfileSettingsForm = () => {
  const { user, token, updateUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSaving(true);

    try {
      const data = await updateProfile(
        token,
        name.trim(),
        email.trim().toLowerCase()
      );

      updateUser(data.user);
      setSuccess(data.message || "Profile updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    name.trim() !== (user?.name ?? "") ||
    email.trim().toLowerCase() !== (user?.email ?? "").toLowerCase();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#212529]">
          Personal information
        </h2>
        <p className="mt-1 text-sm text-[#5B6268]">
          Update the details associated with your account.
        </p>
      </div>

      <div className="mb-7 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCEBE7] text-xl font-bold text-[#3C6E71]">
          {(name.trim() || user?.name || "U")
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-[#212529]">
            {user?.name || "Your account"}
          </p>
          <p className="mt-1 text-sm text-[#5B6268]">
            Mediflow administrator
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Full name
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            required
            disabled={saving || !user}
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Email address
          </label>
          <input
            id="profile-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={254}
            required
            disabled={saving || !user}
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />
        </div>

        {success && (
          <p
            role="status"
            className="rounded-lg border border-[#B7D8CC] bg-[#EDF7F2] px-4 py-3 text-sm text-[#28634F]"
          >
            {success}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-[#E5E0D5] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#7A8085]">
            Changes apply across your workspace.
          </p>

          <button
            type="submit"
            disabled={saving || !user || !hasChanges}
            className="rounded-lg bg-[#3C6E71] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#31595C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving changes..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfileSettings = () => {
  const { user } = useAuth();

  return (
    <ProfileSettingsForm
      key={`${user?.name ?? ""}:${user?.email ?? ""}`}
    />
  );
};

export default ProfileSettings;
