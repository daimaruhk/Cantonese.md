import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ContentType } from './registry';
import type { ContentData } from './types';
import { dataProviders } from './dataProviders';

type PathParams = { fileName: string };

export type ContentPageProps<T extends ContentType> = {
  contentData: ContentData<T>;
};

const createRouteHandler = <T extends ContentType>(contentType: T) => {
  const dataProvider = dataProviders[contentType];

  const getStaticPaths: GetStaticPaths<PathParams> = () => {
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

export const routeHandlers: {
  [K in ContentType]: {
    getStaticPaths: GetStaticPaths<PathParams>;
    getStaticProps: GetStaticProps<ContentPageProps<K>, PathParams>;
  };
} = {
  idioms: createRouteHandler('idioms'),
};
