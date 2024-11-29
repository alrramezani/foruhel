import { z } from "zod";
export const ExperienceBody = z.object({
  companyName: z.string({ invalid_type_error: "must be string" }),
  position: z.string({ invalid_type_error: "must be string" }),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  description: z.string({ invalid_type_error: "must be string" }).optional(),
});
