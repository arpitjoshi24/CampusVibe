import express from "express";
import { registerStudent } from "../controllers/registrationController.js";

const router = express.Router();

router.post("/register", registerStudent);

export default router;
