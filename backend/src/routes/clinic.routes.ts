import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getMyClinic,
  updateMyClinic,
} from "../controllers/clinic.controller";

const router = Router();

router.get("/me", authenticate, getMyClinic);
router.patch("/me", authenticate, updateMyClinic);

export default router;