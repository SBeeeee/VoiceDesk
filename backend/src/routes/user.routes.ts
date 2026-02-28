import express from "express";

import { register, login, logout, getMe } from "../controllers/users.controllers.js"
import { verifyUser } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyUser, getMe);

export default router;
