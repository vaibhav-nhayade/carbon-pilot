const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("carbonpilot_access_token");
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const data = await response.json();

      if (typeof data?.detail === "string") {
        message = data.detail;
      } else if (typeof data?.message === "string") {
        message = data.message;
      }
    } catch {
      // Keep default error message.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export async function getCurrentUser() {
  return apiRequest("/users/me");
}

export async function loginUser(email: string, password: string) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function getFacilities() {
  return apiRequest("/facilities");
}

export async function getFacility(facilityId: string) {
  return apiRequest(`/facilities/${facilityId}`);
}

export async function createFacility(data: {
  name: string;
  industry_type: string;
  location?: string;
  description?: string;
}) {
  return apiRequest("/facilities", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getFacilityData(
  facilityId: string,
  dataType: "energy" | "materials" | "production" | "waste"
) {
  return apiRequest(`/facilities/${facilityId}/${dataType}`);
}

export async function createFacilityData(
  facilityId: string,
  dataType: "energy" | "materials" | "production" | "waste",
  data: unknown
) {
  return apiRequest(`/facilities/${facilityId}/${dataType}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}