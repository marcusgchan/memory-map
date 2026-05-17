import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  doublePrecision,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod/v4";

export const pgTable = pgTableCreator((name) => `${name}`);

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export * from "./auth-schema";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersSchema = createSelectSchema(users);

export type Users = typeof users.$inferSelect;

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const accountsSchema = createSelectSchema(accounts);

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const sessionsSchema = createSelectSchema(sessions);

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const verificationsSchema = createSelectSchema(verifications);

export const diariesToUsers = pgTable(
  "diaries_to_users",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    diaryId: text("diary_id")
      .notNull()
      .references(() => diaries.id),
  },
  (table) => {
    return [primaryKey({ columns: [table.userId, table.diaryId] })];
  },
);

export const diariesToUsersSchema = createSelectSchema(diariesToUsers);

export const diaries = pgTable("diaries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const diariesSchema = createSelectSchema(diaries);
export type Diaries = typeof diaries.$inferSelect;

export const entries = pgTable("entries", {
  id: text("id").primaryKey(),
  diaryId: text("diary_id")
    .notNull()
    .references(() => diaries.id),
  day: date("day", { mode: "string" }).notNull(),
  title: text("title").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const entriesSchema = createSelectSchema(entries);

export type Entries = typeof entries.$inferSelect;

// new
export const statusEnum = pgEnum("status", [
  "pending", // set on presigned url creation (done)
  // "uploaded", // set after minio sends event to api (file uploaded to minio) (not needed?)
  "processing", // set right before processing image (compress image and upload) (done)
  "processed", // set after processing is completed and uploaded (done)
  "done", // linked to something
  "failed", // set on any error
]);

export const fileUpload = pgTable("file_uploads", {
  key: text("key").primaryKey(),
  status: statusEnum().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  takenAt: timestamp("taken_at").notNull().defaultNow(),
  uploadAt: timestamp("created_at").notNull().defaultNow(),
});

export const fileUploadSchema = createSelectSchema(fileUpload);

export type FileUpload = typeof fileUpload.$inferSelect;

export const genericImage = pgTable("generic_images", {
  key: text("key").references(() => fileUpload.key),
  name: text("name").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  compressionStatus: text("compression_status")
    .default("success")
    .$type<"success" | "failure">()
    .notNull(),
});
export const genericImageSchema = createSelectSchema(genericImage);
// new

export const imageKeys = pgTable("image_keys", {
  key: text("key").primaryKey(),

  // name, mimetype, size are for populating edit form image field
  name: text("name").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  compressionStatus: text("compression_status")
    .default("success")
    .$type<"success" | "failure">()
    .notNull(),
  takenAt: timestamp("taken_at").notNull().defaultNow(),
  uploadAt: timestamp("created_at").notNull().defaultNow(),
});

export const imageKeysSchema = createSelectSchema(imageKeys);

export type ImageKeys = typeof imageKeys.$inferSelect;

export const geoData = pgTable("geo_data", {
  key: text("key")
    .references(() => imageKeys.key)
    .primaryKey(),
  lon: doublePrecision("lon").notNull(),
  lat: doublePrecision("lat").notNull(),
});

export const geoDataSchema = createSelectSchema(geoData);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  entryId: text("entry_id")
    .notNull()
    .references(() => entries.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 2048 }).notNull(),
  order: integer("order").notNull(),
});
export const postsSchema = createSelectSchema(posts);
export type Posts = typeof posts.$inferSelect;

export const postLocations = pgTable("post_locations", {
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .primaryKey(),
  address: text("address").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  latitude: doublePrecision("latitude").notNull(),
});
export const postLocationsSchema = createSelectSchema(postLocations);
export type PostLocations = typeof postLocations.$inferSelect;

export const postImages = pgTable("post_images", {
  id: uuid("id").primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.id),
  imageKey: text("image_key")
    .notNull()
    .references(() => imageKeys.key),
  order: integer("order").notNull(),
});

export const postImagesSchema = createSelectSchema(postImages);

// export const editorStates = pgTable("editor_states", {
//   data: json("editor_state").$type<
//     SerializedEditorState<SerializedLexicalNode>
//   >(),
//   entryId: bigint("entry_id", { mode: "number" })
//     .primaryKey()
//     .references(() => entries.id),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });
// export type EditorStates = typeof editorStates.$inferSelect;
