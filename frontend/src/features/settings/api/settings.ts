
const API_URL = import.meta.env.VITE_API_URL;

interface UpdatedUser {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

interface ProfileResponse {
  message: string;
  user: UpdatedUser;
}

interface ApiResponse {
  message: string;
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
) => {
  return typeof data.message === "string"
    ? data.message
    : fallback;
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const updateProfile = async (
  token: string,
  name: string,
  email: string
): Promise<ProfileResponse> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ name, email }),
  });

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to update profile")
    );
  }

  if (!data.user || typeof data.user !== "object") {
    throw new Error("Invalid profile response from server");
  }

  return data as unknown as ProfileResponse;
};

export const changePassword = async (
  token: string,
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse> => {
  const response = await fetch(
    `${API_URL}/auth/change-password`,
    {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ currentPassword, newPassword }),
    }
  );

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(data, "Unable to change password")
    );
  }

  return data as unknown as ApiResponse;
};

