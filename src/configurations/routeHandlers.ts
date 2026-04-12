// Server only

import type { GetStaticPaths, GetStaticProps } from 'next';
import { contentTypes, type ContentType } from './registry';
import type { ContentData } from './types';
import { dataProviders } from './dataProviders';

type DetailPagePathParams = { contentType: ContentType; fileName: string };

type ListPagePathParams = { contentType: ContentType };

export type DetailPageProps = {
  contentData: ContentData;
};

export type ListPageProps = {
  contentType: ContentType;
};

type RouterHandlers = {
  getListPageStaticPaths: GetStaticPaths<ListPagePathParams>;
  getListPageStaticProps: GetStaticProps<ListPageProps, ListPagePathParams>;
  getDetailPageStaticPaths: GetStaticPaths<DetailPagePathParams>;
  getDetailPageStaticProps: GetStaticProps<
    DetailPageProps,
    DetailPagePathParams
  >;
};

export const routeHandlers: RouterHandlers = {
  getListPageStaticPaths: () => {
    return {
      paths: contentTypes.map((contentType) => ({
        params: { contentType },
      })),
      fallback: false,
    };
  },
  getListPageStaticProps: ({ params }) => {
    const contentType = params?.contentType;

    if (!contentType) {
      return { notFound: true };
    }

    return {
      props: {
        contentType,
      },
    };
  },
  getDetailPageStaticPaths: () => {
    return {
      paths: contentTypes.flatMap((contentType) => {
        const dataProvider = dataProviders[contentType];
        const metadataList = dataProvider.getAllMetadata();
        return metadataList.map((metadata) => ({
          params: { contentType, fileName: metadata.fileName },
        }));
      }),
      fallback: false,
    };
  },
  getDetailPageStaticProps: ({ params }) => {
    const contentType = params?.contentType;
    const fileName = params?.fileName;

    if (!contentType || !fileName) {
      return { notFound: true };
    }

    const dataProvider = dataProviders[contentType];
    const contentData = dataProvider.getContentData(fileName);

    return {
      props: {
        contentData,
      },
    };
  },
};
