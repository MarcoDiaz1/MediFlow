import { Router } from "express";
import {
  getPatientsSummary,
  getPatientById,
  createPatient,
  updatePatient,
} from "../controllers/patients.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/summary", authenticate, getPatientsSummary);
router.get("/:id", authenticate, getPatientById);
router.post("/", authenticate, createPatient);
router.put("/:id", authenticate, updatePatient);

export default router;
