
const API_URL = import.meta.env.VITE_API_URL;

export interface Clinic {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ClinicResponse {
  clinic: Clinic;
}

interface UpdateClinicResponse {
  message: string;
  clinic: Clinic;
}

const readResponse = async (
  response: Response
): Promise<Record<string, unknown>> => {
  const data: unknown = await response.json().catch(() => ({}));

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }

  return data as Record<string, unknown>;
};

const getErrorMessage = (
  data: Record<string, unknown>,
  fallback: string
) => (typeof data.message === "string" ? data.message : fallback);

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const getMyClinic = async (
  token: string
): Promise<ClinicResponse> => {
  const response = await fetch(`${API_URL}/clinic/me`, {
    method: "GET",
    headers: authHeaders(token),
  });

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to retrieve clinic information.")
    );
  }

  if (!data.clinic || typeof data.clinic !== "object") {
    throw new Error("Invalid clinic response from server.");
  }

  return data as unknown as ClinicResponse;
};

export const updateMyClinic = async (
  token: string,
  clinic: Pick<
    Clinic,
    "name" | "phone" | "email" | "address" | "description"
  >
): Promise<UpdateClinicResponse> => {
  const response = await fetch(`${API_URL}/clinic/me`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(clinic),
  });

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to update clinic information.")
    );
  }

  if (!data.clinic || typeof data.clinic !== "object") {
    throw new Error("Invalid clinic response from server.");
  }

  return data as unknown as UpdateClinicResponse;
};
