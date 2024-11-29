import { z } from "zod";
export const EducationBody = z.object({
  institution: z.string({ invalid_type_error: "must be string" }),
  degree: z.string({ invalid_type_error: "must be string" }),
  fieldOfStudy: z.string({ invalid_type_error: "must be string" }),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
});
