import Document, { Head, Html, Main, NextScript } from "next/document";
export default class _Document extends Document {
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