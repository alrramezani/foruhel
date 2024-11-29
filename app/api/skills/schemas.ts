import { z } from "zod";
export const SkillBody = z.object({
  name: z.string({ invalid_type_error: "must be string" }),
  level: z.string({ invalid_type_error: "must be string" }).optional(),
});
