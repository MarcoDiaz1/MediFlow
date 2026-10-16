import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/layout/Layout";
import Patients from "../pages/Patients";
import PatientProfile from "../pages/PatientProfile";
import Appointments from "../pages/Appointments";
import Documents from "../pages/Documents";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/patients",
            element: <Patients />,
          },
          {
            path: "/patients/:patientId",
            element: <PatientProfile />,
          },
          {
             path: "/appointments",
            element: <Appointments />,
          },
          {
             path: "/documents",
            element: <Documents />,
          },
          {
             path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
