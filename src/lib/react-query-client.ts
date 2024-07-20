import { QueryClient } from "@tanstack/react-query";

declare const globalThis: {
  queryClientGlobal?: QueryClient | null;
} & typeof global;

const queryClient = globalThis.queryClientGlobal ?? new QueryClient();

export default queryClient;

if (process.env.NODE_ENV !== "production")
  globalThis.queryClientGlobal = queryClient;
