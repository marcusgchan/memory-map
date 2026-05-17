import { createCollection } from "@tanstack/db";
import { powerSyncCollectionOptions } from "@tanstack/powersync-db-collection";

import { memorySchema } from "@memory-map/validators";

import { APP_SCHEMA, db } from "../utils/local-db";

export const memoriesCollection = createCollection(
  powerSyncCollectionOptions({
    database: db,
    table: APP_SCHEMA.props.diaries,
    schema: memorySchema,
    onDeserializationError: (error) => {
      // Present fatal error
      // TODO: log
      console.error(error);
    },
  }),
);
