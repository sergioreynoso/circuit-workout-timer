import type { AppProps } from "next/app";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import AuthWrapper from "../components/auth/authWrapper";

import { ThemeProvider } from "next-themes";
import { globalStyles } from "../styles";
import { theme } from "../styles/stitches.congif";
import Header from "../components/header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
  globalStyles();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            value={{
              light: theme.light,
              dark: theme.dark,
            }}>
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
