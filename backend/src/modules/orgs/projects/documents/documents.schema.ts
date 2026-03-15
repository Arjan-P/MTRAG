import {z} from "zod";

export const uploadDocumentSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number().int().positive()
});

export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>;
