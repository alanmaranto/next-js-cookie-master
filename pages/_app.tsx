import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppContext, AppProps } from "next/app";
import { GetServerSideProps } from "next";
import { customTheme } from "../themes";

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  console.log(rest)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const { req } = ctx;
  const theme = req ? (req as any).cookies.theme : { theme: "light" };

  console.log(req.cookies);
  console.log(theme);

  const validThemes = ["light", "dark", "custom"];

  // const pageProps = await App.getInitialProps(appContext);
  // return { ...pageProps, theme };
  return {
    theme: validThemes.includes(theme) ? theme : "dark",
  };
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const { theme = "light" } = req.cookies;


  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "dark",
    },
  };
};
 */
export default MyApp;
