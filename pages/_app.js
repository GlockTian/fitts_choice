import { Navigation } from "../components/navigation";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // create a mantine provider
  return (
    <div>
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
    </div>
  );
}

export default MyApp;
