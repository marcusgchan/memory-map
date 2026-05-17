import { Text, View } from "react-native";
import { eq, useLiveQuery } from "@tanstack/react-db";

import { memoryToUserCollection } from "~/lib/memories/memory-to-user.collection";
import { postsCollection } from "~/lib/memories/post.collection";

export default function Memories() {
  const { data } = useLiveQuery((q) =>
    q
      .from({ memoryToUser: memoryToUserCollection })
      .innerJoin({ post: postsCollection }, ({ memoryToUser, post }) =>
        eq(memoryToUser.diary_id, post.id),
      )
      .where(({ memoryToUser }) => eq(memoryToUser.user_id, ""))
      .select(({ post }) => ({ id: post.id, name: post.title })),
  );
  console.log(data);
  return (
    <View>
      <Text>Memories Page</Text>
    </View>
  );
}
