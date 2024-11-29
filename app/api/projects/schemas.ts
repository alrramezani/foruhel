import { z } from "zod";
export const ProjectBody = z.object({
  title: z.string({ invalid_type_error: "must be string" }),
  description: z.string({ invalid_type_error: "must be string" }).optional(),
  imageUrl: z.string({ invalid_type_error: "must be string" }).optional(),
  projectUrl: z.string({ invalid_type_error: "must be string" }).optional(),
  technologies: z.string().array(),
});
