import express from "express";
import { uploadDocumentController } from "./documents.controller.js";
import { asyncHandler } from "../../../../lib/asyncHandler.js";

const router = express.Router({mergeParams: true});

router.post("/", asyncHandler(uploadDocumentController));

export default router;
