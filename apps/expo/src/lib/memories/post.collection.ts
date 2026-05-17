import { createCollection } from "@tanstack/db";
import { powerSyncCollectionOptions } from "@tanstack/powersync-db-collection";

import { postSchema } from "@memory-map/validators";

import { APP_SCHEMA, db } from "../utils/local-db";

export const postsCollection = createCollection(
  powerSyncCollectionOptions({
    database: db,
    table: APP_SCHEMA.props.posts,
    schema: postSchema,
    onDeserializationError: (error) => {
      console.error(error);
    },
  }),
);
