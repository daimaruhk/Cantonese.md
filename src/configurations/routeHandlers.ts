import type { GetStaticPaths, GetStaticProps } from 'next';
import { contentRegistry, type ContentType } from './registry';
import type { ContentData } from './types';
import { dataProviders } from './dataProviders';

type PathParams = { fileName: string };

export type ContentPageProps<T extends ContentType> = {
  contentData: ContentData<T>;
};

type RouterHandler<T extends ContentType> = {
  getStaticPaths: GetStaticPaths<PathParams>;
  getStaticProps: GetStaticProps<ContentPageProps<T>, PathParams>;
};

type RouteHandlers = {
  [K in ContentType]: RouterHandler<K>;
};

const createRouteHandler = <T extends ContentType>(
  contentType: T,
): RouterHandler<T> => {
  const dataProvider = dataProviders[contentType];

  const getStaticPaths = () => {
    const metadataList = dataProvider.getAllMetadata();
    return {
      paths: metadataList.map((metadata) => ({
        params: { fileName: metadata.fileName },
      })),
      fallback: false,
    };
  };

  const getStaticProps: GetStaticProps<ContentPageProps<T>, PathParams> = ({
    params,
  }) => {
    const fileName = params?.fileName;

    if (!fileName) {
      return { notFound: true };
    }

    const contentData = dataProvider.getContentData(fileName);

    return {
      props: {
        contentData,
      },
    };
  };

  return { getStaticPaths, getStaticProps };
};

export const routeHandlers = Object.values(contentRegistry).reduce(
  (handlers, config) => {
    handlers[config.contentType] = createRouteHandler(config.contentType);
    return handlers;
  },
  {} as RouteHandlers,
);
