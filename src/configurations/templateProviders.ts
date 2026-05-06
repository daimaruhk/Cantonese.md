// Server only

import crypto from 'node:crypto';
import { contentTypes, type ContentType } from './registry';
import type { Frontmatter } from './types';

type TemplateProviders = {
  [K in ContentType]: {
    generateTemplate: () => string;
  };
};

type TemplateObject = {
  id: string;
  [key: string]: string;
};

const templateObjectByContentType: {
  [K in ContentType]: Frontmatter<K>;
} = {
  idioms: {
    id: '',
    term: '',
    termJyutping: '',
    answer: '',
    answerJyutping: '',
    explanation: '',
  },
};

export const templateProviders = Object.fromEntries(
  contentTypes.map((contentType) => [
    contentType,
    {
      generateTemplate: () =>
        toTemplate(templateObjectByContentType[contentType]),
    },
  ]),
) as TemplateProviders;

const ID_ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const createRandomId = (length = 12) => {
  const id = Array.from({ length }, () =>
    ID_ALPHABET.charAt(crypto.randomInt(0, ID_ALPHABET.length)),
  ).join('');

  return id;
};

export const toTemplate = (templateObject: TemplateObject) => {
  templateObject.id = createRandomId();

  let template = '---\n';

  Object.entries(templateObject).forEach(([key, value]) => {
    const computedValue = !!value ? ` ${value}` : '';
    template += `${key}:${computedValue}\n`;
  });
  template += '---\n\n';

  return template;
};
