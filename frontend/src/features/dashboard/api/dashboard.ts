import type {DashboardSummary } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/dashboard/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return response.json();
};