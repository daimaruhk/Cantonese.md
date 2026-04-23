import fs from 'node:fs';
import path from 'node:path';
import { vi } from 'vitest';
import type { ContentType } from '@/configurations/registry';
import type { ContentMetadata } from '@/configurations/types';

const FIXTURES_DIR = path.resolve(__dirname, './api');

const loadFixture = <T extends ContentType>(
  contentType: T,
): ContentMetadata<T>[] => {
  const filePath = path.join(FIXTURES_DIR, `${contentType}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
};

export const fixtures = {
  idioms: loadFixture('idioms'),
} as const;

type FetchMockConfig =
  | { scenario: 'success' }
  | { scenario: 'loading' }
  | { scenario: 'error'; status?: number; message?: string }
  | { scenario: 'network-error'; message?: string }
  | { scenario: 'empty' };

export const setupFetchMock = (config: FetchMockConfig) => {
  globalThis.fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockImplementation((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();

      switch (config.scenario) {
        case 'loading':
          // Never-resolving promise keeps isLoading true
          return new Promise(() => {});

        case 'network-error':
          return Promise.reject(new Error(config.message ?? 'Network Error'));

        case 'error': {
          return Promise.resolve(
            new Response(config.message ?? 'Server error', {
              status: config.status ?? 500,
              headers: { 'Content-Type': 'text/plain' },
            }),
          );
        }

        case 'empty':
          return Promise.resolve(
            new Response(JSON.stringify([]), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );

        case 'success':
          return Promise.resolve(
            new Response(JSON.stringify(resolveFixtureForUrl(url)), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );

        default:
          throw new Error(
            `Unhandled fetch mock scenario: ${JSON.stringify(config)}`,
          );
      }
    });
};

const resolveFixtureForUrl = (url: string): ContentMetadata[] => {
  for (const [contentType, data] of Object.entries(fixtures)) {
    if (url.includes(`/api/${contentType}.json`)) {
      return data;
    }
  }
  return [];
};
