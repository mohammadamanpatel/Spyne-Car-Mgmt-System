import express from "express";
import { login, signup } from "../controllers/user.controller.js";

const router = express.Router();

// Sign up route
router.post("/signup", signup);

// Login route
router.post("/login", login);

export default router;
