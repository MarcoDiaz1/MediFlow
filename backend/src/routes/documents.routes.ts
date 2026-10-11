
import { Router } from "express";
import {
  createDocument,
  getDocument,
  getDocumentsSummary,
} from "../controllers/document.controller";
import { authenticate } from "../middleware/auth.middleware";
import upload from "../lib/multer";

const router = Router();

router.get("/summary", authenticate, getDocumentsSummary);
router.get("/:id", authenticate, getDocument);
router.post("/", authenticate, upload.single("file"), createDocument);

export default router;
