import express from "express";
import { upload } from "../middleware/multer.middlewear.js";
import { uploadFile } from "../controller/file.controller.js";
import { authMiddleware } from "../middleware/auth.middlewear.js";
import { extractContent } from "../controller/extraction.controller.js";


const router = express.Router();

router.post("/upload",authMiddleware, upload.single("file"),uploadFile) 
router.post("/extract",authMiddleware, upload.single("screenshot"),extractContent) 
        
export default router;


