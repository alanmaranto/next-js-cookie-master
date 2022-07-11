import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { customTheme } from "../themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
