import { createCollection } from "@tanstack/db";
import { powerSyncCollectionOptions } from "@tanstack/powersync-db-collection";

import { memoryToUserSchema } from "@memory-map/validators";

import { APP_SCHEMA, db } from "../utils/local-db";

export const memoryToUserCollection = createCollection(
  powerSyncCollectionOptions({
    database: db,
    table: APP_SCHEMA.props.diaries_to_users,
    schema: memoryToUserSchema,
    onDeserializationError: (error) => {
      console.error(error);
    },
  }),
);
