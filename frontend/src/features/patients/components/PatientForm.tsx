import React from "react";

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

interface PatientFormProps {
  initialValues: PatientFormData;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (data: PatientFormData) => Promise<void>;
  onCancel: () => void;
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-[#212529] focus:ring-2 focus:ring-gray-300";

const PatientForm = ({
  initialValues,
  submitLabel,
  submittingLabel,
  onSubmit,
  onCancel,
  onSubmittingChange,
}: PatientFormProps) => {
  const [form, setForm] = React.useState<PatientFormData>(initialValues);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      dateOfBirth: form.dateOfBirth,
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
    };

    if (Object.values(normalizedForm).some((value) => !value)) {
      setError("Please complete all fields.");
      return;
    }

    if (
      normalizedForm.firstName.length > 100 ||
      normalizedForm.lastName.length > 100
    ) {
      setError("Names cannot exceed 100 characters.");
      return;
    }

    if (normalizedForm.phone.length > 20) {
      setError("Phone number cannot exceed 20 characters.");
      return;
    }

    if (normalizedForm.email.length > 254) {
      setError("Email cannot exceed 254 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedForm.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const date = new Date(`${normalizedForm.dateOfBirth}T00:00:00`);

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(normalizedForm.dateOfBirth) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== normalizedForm.dateOfBirth
    ) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (normalizedForm.dateOfBirth > getLocalDate()) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    try {
      setIsSubmitting(true);
      onSubmittingChange?.(true);
      await onSubmit(normalizedForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save patient. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      onSubmittingChange?.(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-[#212529]">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            maxLength={100}
            autoComplete="given-name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-[#212529]">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            maxLength={100}
            autoComplete="family-name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-medium text-[#212529]">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            max={getLocalDate()}
            required
            autoComplete="bday"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[#212529]">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            maxLength={20}
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#212529]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={254}
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-[#212529] transition hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#212529] px-5 py-2.5 font-medium text-white transition hover:bg-[#343a40] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;