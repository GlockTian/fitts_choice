import { MantineProvider } from "@mantine/core";
import { Navigation } from "../components/navigation";
import Head from "next/head";
import "../styles/globals.css";
import { getCookie, setCookie } from "cookies-next";

function MyApp({ Component, pageProps }) {
  // create a mantine provider
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
      </MantineProvider>
    </div>
  );
}

MyApp.getInitialProps = (ctx) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});

export default MyApp;
