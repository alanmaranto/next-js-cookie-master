import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import type { AppContext, AppProps } from "next/app";
import { GetServerSideProps } from "next";
import { customTheme, darkTheme, lightTheme } from "../themes";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Props extends AppProps {
  theme: string;
}

type TypeTheme = { [key: string]: Theme };

function MyApp({ Component, pageProps, ...rest }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "light";
    // With ternarys
    /*     const selectedTheme: Theme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme; */

    // with dynamic object
    const selectedTheme: TypeTheme = {
      light: lightTheme,
      dark: darkTheme,
      custom: customTheme,
    };
    setCurrentTheme(selectedTheme[cookieTheme]);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

/* MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const { req } = ctx;
  const theme = req ? (req as any).cookies.theme : { theme: "light" };

  const validThemes = ["light", "dark", "custom"];

  return {
    theme: validThemes.includes(theme) ? theme : "dark",
  };
}; */

export default MyApp;
