// Server only

import type { GetStaticPaths, GetStaticProps } from 'next';
import { contentTypes, type ContentType } from './registry';
import type { ContentData } from './types';
import { getAllMetadata, getContentData } from './utils';

type DetailPagePathParams = { contentType: ContentType; fileName: string };

type ListPagePathParams = { contentType: ContentType };

export type DetailPageProps<T extends ContentType = ContentType> = {
  contentData: ContentData<T>;
};

export type ListPageProps<T extends ContentType = ContentType> = {
  contentType: T;
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

    if (!contentType || !contentTypes.includes(contentType)) {
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
        const metadataList = getAllMetadata(contentType);
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

    if (!contentType || !fileName || !contentTypes.includes(contentType)) {
      return { notFound: true };
    }

    const contentData = getContentData(contentType, fileName);

    return {
      props: {
        contentData,
      },
    };
  },
};
