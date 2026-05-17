import { createCollection } from "@tanstack/db";
import { powerSyncCollectionOptions } from "@tanstack/powersync-db-collection";

import { userSchema } from "@memory-map/validators";

import { APP_SCHEMA, db } from "../utils/local-db";

export const usersCollection = createCollection(
  powerSyncCollectionOptions({
    database: db,
    table: APP_SCHEMA.props.users,
    schema: userSchema,
    onDeserializationError: (error) => {
      console.error(error);
    },
  }),
);
