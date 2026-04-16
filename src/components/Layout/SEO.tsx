import Head from 'next/head';
import {
  imageUrl,
  siteName,
  toTitle,
  type SeoMeta,
} from '@/configurations/seoProviders';

export type SEOProps = SeoMeta;

export const SEO = ({
  title,
  description,
  canonicalUrl,
  jsonLd,
  ...rest
}: SeoMeta) => {
  title = toTitle(title);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="google-site-verification"
        content="EvGfXOVfKeuKk-4OazosNydW6ItTJRMhZrSAsdTowww"
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content="zh_HK" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={rest.ogType} />
      {rest.ogType === 'article' && (
        <>
          <meta
            property="article:published_time"
            content={rest.publishedTime}
          />
          <meta property="article:modified_time" content={rest.modifiedTime} />
          {rest.authors.map((author) => (
            <meta key={author} property="article:author" content={author} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
    </Head>
  );
};
