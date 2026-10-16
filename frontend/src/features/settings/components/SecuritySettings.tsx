
import { useState, type FormEvent } from "react";
import { MdLockOutline, MdOutlineSecurity } from "react-icons/md";
import { useAuth } from "../../../context/useAuth";
import { changePassword } from "../api/settings";

const SecuritySettings = () => {
  const { user, token } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (newPassword.length < 8) {
      setError("Your new password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("Your new password must be different from your current password.");
      return;
    }

    setSaving(true);

    try {
      const data = await changePassword(
        token,
        currentPassword,
        newPassword
      );

      setSuccess(data.message || "Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change your password."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#212529]">
          Security
        </h2>
        <p className="mt-1 text-sm text-[#5B6268]">
          Manage your password and keep your account secure.
        </p>
      </div>

      {/* Account information */}
      <div className="mb-8 flex items-center gap-4 rounded-xl border border-[#E5E0D5] bg-[#F8F5ED] p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DCEBE7] text-[#3C6E71]">
          <MdOutlineSecurity size={25} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#212529]">
            Account email
          </p>
          <p className="truncate text-sm text-[#5B6268]">
            {user?.email ?? "No email available"}
          </p>
        </div>
      </div>

      {/* Change password */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DCEBE7] text-[#3C6E71]">
          <MdLockOutline size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-[#212529]">
            Change password
          </h3>
          <p className="text-sm text-[#5B6268]">
            Choose a strong password you don't use elsewhere.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="current-password"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Current password
          </label>

          <input
            id="current-password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            disabled={saving}
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            New password
          </label>

          <input
            id="new-password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength={8}
            maxLength={128}
            required
            disabled={saving}
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />

          <p className="mt-2 text-xs text-[#7A8085]">
            Use at least 8 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Confirm new password
          </label>

          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={8}
            maxLength={128}
            required
            disabled={saving}
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

        <div className="border-t border-[#E5E0D5] pt-5">
          <button
            type="submit"
            disabled={
              saving ||
              !user ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword
            }
            className="w-full rounded-lg bg-[#3C6E71] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#31595C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {saving ? "Updating password..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;
