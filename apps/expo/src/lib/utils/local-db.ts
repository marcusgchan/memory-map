import { column, PowerSyncDatabase, Schema, Table } from "@powersync/web";

export const APP_SCHEMA = new Schema({
  post: new Table({
    id: column.text,
    title: column.text,
    content: column.text,
    created_at: column.text,
    updated_at: column.text,
  }),

  users: new Table({
    id: column.text,
    name: column.text,
    email: column.text,
    email_verified: column.integer,
    image: column.text,
    created_at: column.text,
    updated_at: column.text,
  }),

  accounts: new Table({
    id: column.text,
    account_id: column.text,
    provider_id: column.text,
    user_id: column.text,
    access_token: column.text,
    refresh_token: column.text,
    id_token: column.text,
    access_token_expires_at: column.text,
    refresh_token_expires_at: column.text,
    scope: column.text,
    password: column.text,
    created_at: column.text,
    updated_at: column.text,
  }),

  sessions: new Table({
    id: column.text,
    expires_at: column.text,
    token: column.text,
    created_at: column.text,
    updated_at: column.text,
    ip_address: column.text,
    user_agent: column.text,
    user_id: column.text,
  }),

  verifications: new Table({
    id: column.text,
    identifier: column.text,
    value: column.text,
    expires_at: column.text,
    created_at: column.text,
    updated_at: column.text,
  }),

  diaries_to_users: new Table({
    user_id: column.text,
    diary_id: column.text,
  }),

  diaries: new Table({
    id: column.text,
    name: column.text,
    created_at: column.text,
    updated_at: column.text,
  }),

  entries: new Table({
    id: column.text,
    diary_id: column.text,
    day: column.text,
    title: column.text,
    created_at: column.text,
    updated_at: column.text,
  }),

  file_uploads: new Table({
    key: column.text,
    status: column.text,
    user_id: column.text,
    taken_at: column.text,
    created_at: column.text,
  }),

  generic_images: new Table({
    key: column.text,
    name: column.text,
    mimetype: column.text,
    size: column.integer,
    compression_status: column.text,
  }),

  image_keys: new Table({
    key: column.text,
    name: column.text,
    mimetype: column.text,
    size: column.integer,
    user_id: column.text,
    compression_status: column.text,
    taken_at: column.text,
    created_at: column.text,
  }),

  geo_data: new Table({
    key: column.text,
    lon: column.real,
    lat: column.real,
  }),

  posts: new Table({
    id: column.text,
    entry_id: column.text,
    title: column.text,
    description: column.text,
    order: column.integer,
  }),

  post_locations: new Table({
    post_id: column.text,
    address: column.text,
    longitude: column.real,
    latitude: column.real,
  }),

  post_images: new Table({
    id: column.text,
    post_id: column.text,
    image_key: column.text,
    order: column.integer,
  }),
});

export const db = new PowerSyncDatabase({
  database: {
    dbFilename: "app.sqlite",
  },
  schema: APP_SCHEMA,
});
