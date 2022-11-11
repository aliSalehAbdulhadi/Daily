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
          <meta name="theme-color" content="#427676" />
          <meta name="msapplication-navbutton-color" content="#427676" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-TileColor" content="#00aba9" />
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
            href="/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="192x192"
            href="/icons/android-chrome-maskable-192x192.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="512x512"
            href="/icons/android-chrome-maskable-512x512.png"
          />

          <link
            rel="icon"
            type="png"
            sizes="192x192"
            href="/icons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="256x256"
            href="/icons/android-chrome-256x256.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="512x512"
            href="/icons/android-chrome-512x512.png"
          />

          <link
            rel="icon"
            type="png"
            sizes="36x36"
            href="/icons/android-36x36.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="48x48"
            href="/icons/android-48x48.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="72x72"
            href="/icons/android-72x72.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="96x96"
            href="/icons/android-96x96.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="144x144"
            href="/icons/android-144x144.png"
          />
          <link
            rel="icon"
            type="png"
            sizes="192x192"
            href="/icons/android-192x192.png"
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
