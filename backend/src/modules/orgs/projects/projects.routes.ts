import express from "express";
import documentRoutes from "./documents/documents.routes.js"
import {createProjectController, getProjectController} from "./projects.controller.js";
import { asyncHandler } from "../../../lib/asyncHandler.js";
import {requireOrgRole} from "../../../middleware/orgsRole.middleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", requireOrgRole(['OWNER', 'ADMIN']), asyncHandler(createProjectController));
router.get("/:id", asyncHandler(getProjectController));
router.use("/:project_id/documents", documentRoutes);

export default router;
