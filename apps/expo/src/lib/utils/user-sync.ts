import type { Session } from "@memory-map/auth";

import { usersCollection } from "../memories/user.collection";

export async function syncLocalUser(session: Session) {
  // if (!session?.user) return;
  // const existing = usersCollection.findOne({
  //   where: { id: session.user.id },
  // });
  //
  // if (!existing) {
  //   await usersCollection.insert({
  //     id: session.user.id,
  //     name: session.user.name,
  //     email: session.user.email,
  //     email_verified: session.user.emailVerified ? 1 : 0,
  //     image: session.user.image ?? null,
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //   });
  // }
}
