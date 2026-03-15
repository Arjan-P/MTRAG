import express from "express";
import projectRoutes from "./projects/projects.routes.js";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { createOrgController, getOrgController, inviteUserController } from "./orgs.controller.js";
import { orgsAuthMiddleware } from "../../middleware/orgsAuth.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requireOrgRole } from "../../middleware/orgsRole.middleware.js";

const router = express.Router();

router.use("/:org_id/projects", authMiddleware, asyncHandler(orgsAuthMiddleware), projectRoutes);
router.post("/", authMiddleware, asyncHandler(createOrgController));
router.get("/", authMiddleware, asyncHandler(getOrgController));
router.post("/:org_id/invite", authMiddleware, asyncHandler(orgsAuthMiddleware), requireOrgRole(['OWNER']), asyncHandler(inviteUserController));

export default router;
