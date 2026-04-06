import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-background text-foreground font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
