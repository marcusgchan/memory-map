import Constants from "expo-constants";

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  console.log("[DEBUG] expoConfig.hostUri:", debuggerHost);
  console.log("[DEBUG] resolved localhost:", localhost);

  if (!localhost) {
    // return "https://turbo.t3.gg";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }

  const url = `http://${localhost}:3000`;
  console.log("[DEBUG] getBaseUrl:", url);

  // fetch(`${url}/api/auth/get-session`)
  //   .then((r) => console.log("[DEBUG] GET reachability:", r.status))
  //   .catch((e) => console.log("[DEBUG] GET reachability FAILED:", e.message));
  //
  // fetch(`${url}/api/auth/sign-in/social`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ provider: "discord", callbackURL: "/signin" }),
  // })
  //   .then((r) => r.text().then((t) => console.log("[DEBUG] POST sign-in:", r.status, t)))
  //   .catch((e) => console.log("[DEBUG] POST sign-in FAILED:", e.message));

  return url;
};
