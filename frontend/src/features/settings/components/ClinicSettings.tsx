
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { FaHospital } from "react-icons/fa";
import { useAuth } from "../../../context/useAuth";
import {
  getMyClinic,
  updateMyClinic,
  type Clinic,
} from "../api/clinic";

type ClinicForm = Pick<
  Clinic,
  "name" | "phone" | "email" | "address" | "description"
>;

const EMPTY_FORM: ClinicForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  description: "",
};

const ClinicSettings = () => {
  const { token } = useAuth();

  const [form, setForm] = useState<ClinicForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadClinic = useCallback(async () => {
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getMyClinic(token);

      setForm({
        name: data.clinic.name ?? "",
        phone: data.clinic.phone ?? "",
        email: data.clinic.email ?? "",
        address: data.clinic.address ?? "",
        description: data.clinic.description ?? "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load clinic information."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void Promise.resolve().then(() => loadClinic());
  }, [loadClinic]);

  const handleChange = (
    field: keyof ClinicForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccess("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    if (!form.name.trim()) {
      setError("Clinic name is required.");
      return;
    }

    setSaving(true);

    try {
      const data = await updateMyClinic(token, {
        name: form.name.trim(),
        phone: form.phone?.trim() || null,
        email: form.email?.trim().toLowerCase() || null,
        address: form.address?.trim() || null,
        description: form.description?.trim() || null,
      });

      setForm({
        name: data.clinic.name ?? "",
        phone: data.clinic.phone ?? "",
        email: data.clinic.email ?? "",
        address: data.clinic.address ?? "",
        description: data.clinic.description ?? "",
      });

      setSuccess(data.message || "Clinic information saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save clinic information."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-[#5B6268]">
        Loading clinic information...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-7 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#DCEBE7] text-[#3C6E71]">
          <FaHospital size={25} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#212529]">
            Clinic information
          </h2>
          <p className="mt-1 text-sm text-[#5B6268]">
            Manage the contact details and information for your clinic.
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void loadClinic()}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="clinic-name"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Clinic name *
          </label>

          <input
            id="clinic-name"
            type="text"
            autoComplete="organization"
            maxLength={150}
            required
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            disabled={saving}
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="clinic-phone"
              className="mb-2 block text-sm font-semibold text-[#212529]"
            >
              Phone number
            </label>

            <input
              id="clinic-phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              value={form.phone ?? ""}
              onChange={(event) => handleChange("phone", event.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="clinic-email"
              className="mb-2 block text-sm font-semibold text-[#212529]"
            >
              Contact email
            </label>

            <input
              id="clinic-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              value={form.email ?? ""}
              onChange={(event) => handleChange("email", event.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="clinic-address"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Clinic address
          </label>

          <input
            id="clinic-address"
            type="text"
            autoComplete="street-address"
            maxLength={250}
            value={form.address ?? ""}
            onChange={(event) => handleChange("address", event.target.value)}
            disabled={saving}
            className="w-full rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="clinic-description"
            className="mb-2 block text-sm font-semibold text-[#212529]"
          >
            Description
          </label>

          <textarea
            id="clinic-description"
            rows={4}
            maxLength={1000}
            value={form.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            disabled={saving}
            placeholder="Tell us a little about your clinic..."
            className="w-full resize-y rounded-lg border border-[#D8D2C6] bg-[#FDFCF9] px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:opacity-60"
          />

          <p className="mt-1 text-right text-xs text-[#7A8085]">
            {form.description?.length ?? 0}/1000
          </p>
        </div>

        {success && (
          <p
            role="status"
            className="rounded-lg border border-[#B7D8CC] bg-[#EDF7F2] px-4 py-3 text-sm text-[#28634F]"
          >
            {success}
          </p>
        )}

        <div className="flex justify-end border-t border-[#E5E0D5] pt-5">
          <button
            type="submit"
            disabled={saving || !form.name.trim()}
            className="rounded-lg bg-[#3C6E71] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#31595C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving changes..." : "Save clinic information"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicSettings;
