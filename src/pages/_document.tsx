import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-HK" dir="ltr">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#171717" />
      </Head>
      <body className="bg-background text-foreground font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
