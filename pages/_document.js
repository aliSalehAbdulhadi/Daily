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
          <meta name="theme-color" content="#fff" />
          <meta name="msapplication-navbutton-color" content="#fff" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <link
            rel="apple-touch-icon"
            type="png"
            href="/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="192x192"
            href="/icons/icon-maskable-192x192.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="512x512"
            href="/icons/icon-maskable-512x512.png"
          />

          <link
            rel="icon"
            type="png"
            sizes="512x512"
            href="/icons/icon-512x512.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="192x192"
            href="/icons/icon-192x192.png"
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
