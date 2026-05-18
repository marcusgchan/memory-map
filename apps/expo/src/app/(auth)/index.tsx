import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import {
  setLocalUser,
  useLocalUser,
} from "~/lib/auth/LocalUserContextProvider";
import { authClient } from "~/lib/utils/auth";
import { syncLocalUser } from "~/lib/utils/user-sync";

export default function SignIn() {
  const { data: session } = authClient.useSession();
  const [showError, setShowError] = useState(false);
  console.log("test");
  useEffect(() => {
    if (session?.user) {
      setLocalUser(session.user.id);
      void syncLocalUser(session);
      router.replace("/");
    }
  }, [session]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={async () => {
          const { error } = await authClient.signIn.social({
            provider: "discord",
            callbackURL: "/signin",
          });
          console.log("pressed");
          if (error) {
            setShowError(true);
            return;
          }
        }}
      >
        <Text style={styles.buttonText}>Sign in with Discord</Text>
      </Pressable>
      {showError && (
        <Text style={styles.errorText}>
          Something went wrong. Please try again.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    backgroundColor: "#008080",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
