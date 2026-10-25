import express from "express";
import { deleteEmail, generateEmails, getEmailById, getMyEmails, updateEmail } from "../controller/mail.controller.js";
import { authMiddleware } from "../middleware/auth.middlewear.js";
import { sendEmail } from "../services/email.services.js";


const router = express.Router();

router.post("/generate", authMiddleware,generateEmails);
router.get("/", authMiddleware, getMyEmails);
router.get("/:id", authMiddleware, getEmailById);
router.get("/:id", authMiddleware, updateEmail);
router.get("/:id", authMiddleware, deleteEmail);
router.post("/send", authMiddleware, sendEmail);

export default router;