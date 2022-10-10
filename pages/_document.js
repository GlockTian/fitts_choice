import Document, { Head, Html, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
