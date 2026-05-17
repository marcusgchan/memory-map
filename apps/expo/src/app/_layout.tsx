import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "~/lib/utils/api";

import "../styles.css";

import { LocalUserContextProvider } from "~/lib/auth/LocalUserContextProvider";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalUserContextProvider>
        <Stack />
      </LocalUserContextProvider>
      <StatusBar />
    </QueryClientProvider>
  );
}
