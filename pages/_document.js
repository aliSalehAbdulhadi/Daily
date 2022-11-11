/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Daily" />
          <meta name="apple-mobile-web-app-title" content="Daily" />
          <meta name="theme-color" content="#00695E" />
          <meta name="msapplication-navbutton-color" content="#00695E" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-TileColor" content="#00695E" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#00695e"
          />

          <link rel="shortcut icon" href="/icons/favicon-32x32.png" />

          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />

          <link
            rel="apple-touch-icon"
            type="png"
            href="/icons
            /apple-touch-icon.png"
          />
  
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
