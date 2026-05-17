import { z } from "zod/v4";

export const unused = z.string().describe(
  `This lib is currently not used as we use drizzle-zod for simple schemas
   But as your application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);

export const memorySchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const memoryToUserSchema = z.object({
  user_id: z.string(),
  memory_id: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  email_verified: z.number(),
  image: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const postSchema = z.object({
  id: z.string(),
  entry_id: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number(),
});
