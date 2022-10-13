import type { AppProps } from "next/app";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import AuthWrapper from "../components/auth/AuthWrapper";

import { ThemeProvider } from "next-themes";
import { globalStyles } from "../styles";
import { theme } from "../styles/stitches.congif";
import Header from "../components/header";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
  globalStyles();
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}

export default MyApp;
