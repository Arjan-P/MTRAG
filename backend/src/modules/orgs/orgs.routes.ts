import express from "express";
import {createOrgController, getOrgController} from "./orgs.controller.js";
import {asyncHandler} from "../../lib/asyncHandler.js";
import {authMiddleware} from "../../middleware/auth.middleware.js";
import { createProjectController, getProjectController } from "./projects/projects.controller.js";
import { orgsAuthMiddleware } from "../../middleware/orgsAuth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(createOrgController));
router.get("/", authMiddleware, asyncHandler(getOrgController));
router.post("/:org_id/projects", authMiddleware, asyncHandler(orgsAuthMiddleware), asyncHandler(createProjectController));
router.get("/:org_id/projects/:id", authMiddleware, asyncHandler(orgsAuthMiddleware), asyncHandler(getProjectController));

export default router;
