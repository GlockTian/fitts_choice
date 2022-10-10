import { MantineProvider } from "@mantine/core";
import { Navigation } from "../components/navigation";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // create a mantine provider
  return (
    <div>

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

export default MyApp;
