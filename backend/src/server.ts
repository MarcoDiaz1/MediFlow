import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import patientRoutes from "./routes/patients.routes";
import appointmentsRoutes from "./routes/appointments.route";
import documentsRoutes from "./routes/documents.routes";
import clinicRoutes from "./routes/clinic.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/clinic", clinicRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
