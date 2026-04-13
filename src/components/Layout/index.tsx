import { Footer } from './Footer';
import { Header } from './Header';
import { SEO, type SEOProps } from './SEO';

type LayoutProps = {
  children: React.ReactNode;
  seo: SEOProps;
};

export const Layout = ({ children, seo }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO {...seo} />
      <Header />
      <main className="py-16 md:py-20 lg:py-24">{children}</main>
      <Footer />
    </div>
  );
};
