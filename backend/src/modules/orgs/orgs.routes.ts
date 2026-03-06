import express from "express";
import {createOrgController, getOrgController} from "./orgs.controller.js";
import {asyncHandler} from "../../lib/asyncHandler.js";
import {authMiddleware} from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(createOrgController));
router.get("/", authMiddleware, asyncHandler(getOrgController));

export default router;
