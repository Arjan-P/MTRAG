import express from "express";
import {createUserController, getUserController, loginUserController} from "./users.controller.js";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", asyncHandler(createUserController));
router.post("/login", asyncHandler(loginUserController));
router.get("/me", authMiddleware, asyncHandler(getUserController));

export default router;
