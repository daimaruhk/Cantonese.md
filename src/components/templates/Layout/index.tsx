import Head from 'next/head';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
