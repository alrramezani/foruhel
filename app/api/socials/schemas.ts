import { z } from "zod";
export const SocialBody = z.object({
  platform: z.string({ invalid_type_error: "must be string" }),
  url: z.string({ invalid_type_error: "must be string" }),
});
