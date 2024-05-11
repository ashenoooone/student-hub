import { Toaster } from "@/shared/ui/toaster";
import "@/styles/globals.css";
import { NavBar } from "@/widgets/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
      <Toaster />
    </QueryClientProvider>
  );
}
