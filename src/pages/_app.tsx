import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Noto_Sans_TC, JetBrains_Mono } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/styles/globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --font-noto-sans-tc: ${notoSansTC.style.fontFamily};
          --font-jetbrains-mono: ${jetbrainsMono.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
