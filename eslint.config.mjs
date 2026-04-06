import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
]);

export default eslintConfig;
