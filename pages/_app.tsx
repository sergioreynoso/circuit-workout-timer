import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { globalStyles } from "../styles";

import { theme } from "../styles/stitches.congif";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      value={{
        light: theme.light,
        dark: theme.dark,
      }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
