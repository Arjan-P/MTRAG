import express from "express";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { createOrgController, getOrgController, inviteUserController } from "./orgs.controller.js";
import { createProjectController, getProjectController } from "./projects/projects.controller.js";
import { orgsAuthMiddleware } from "../../middleware/orgsAuth.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requireOrgRole } from "../../middleware/orgsRole.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(createOrgController));
router.get("/", authMiddleware, asyncHandler(getOrgController));
router.post("/:org_id/projects", authMiddleware, asyncHandler(orgsAuthMiddleware), requireOrgRole(['OWNER', 'ADMIN']), asyncHandler(createProjectController));
router.get("/:org_id/projects/:id", authMiddleware, asyncHandler(orgsAuthMiddleware), asyncHandler(getProjectController));
router.get("/:org_id/invite", authMiddleware, asyncHandler(orgsAuthMiddleware), requireOrgRole(["ADMIN"]), asyncHandler(inviteUserController));

export default router;
