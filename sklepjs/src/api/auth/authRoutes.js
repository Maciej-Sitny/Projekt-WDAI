import { Router } from "express";
import {
  registerUser,
  loginUserController,
  getUserDetailsController,
  getUserByIdController,
} from "./authController.js";
import { authenticateToken } from "./authenicator.js";

const router = Router();

// Define your routes here
router.post("/register", registerUser);
router.post("/login", loginUserController);
router.get("/users/me", authenticateToken, getUserDetailsController);
router.get("/user/:id", getUserByIdController);

export default router;
