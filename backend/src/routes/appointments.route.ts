import { Router } from "express";
import { getAppointmentsSummary, createAppointment} from "../controllers/appointment.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/summary", authenticate, getAppointmentsSummary);
router.post("/", authenticate, createAppointment);

export default router;