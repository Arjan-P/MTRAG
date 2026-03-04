import express from "express";
import {createUserController, getUserController} from "../modules/users/users.controller.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", asyncHandler(createUserController));
router.get("/me", authMiddleware, asyncHandler(getUserController));

export default router;
