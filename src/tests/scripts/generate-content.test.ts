// @vitest-environment node

import fs from 'node:fs';
import { beforeEach, afterEach, expect, it, vi, describe } from 'vitest';
import { main } from '@/scripts/generate-content';
import { contentTypes } from '@/configurations/registry';
import {
  templateProviders,
  toTemplate,
} from '@/configurations/templateProviders';

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn().mockImplementation(() => false),
    mkdirSync: vi.fn().mockImplementation(() => undefined),
    writeFileSync: vi.fn().mockImplementation(() => undefined),
  },
}));

vi.mock('node:crypto', () => ({
  default: {
    randomInt: vi.fn().mockImplementation(() => 0),
  },
}));

const existsSyncMock = vi.mocked(fs.existsSync);
const writeFileSyncMock = vi.mocked(fs.writeFileSync);

describe('main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, 'cwd').mockReturnValue('/mock-cwd');
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 1 when content type is missing', () => {
    const exitCode = main(undefined, 'testFileName');
    expect(exitCode).toBe(1);
    expect(console.error).toHaveBeenCalledWith(
      'Error: You must provide a content type and a file name as arguments.',
    );
    expect(console.error).toHaveBeenCalledWith(
      'Example: pnpm run gen:content idioms 賣魚佬沖涼, which will generate a new file at src/contents/idioms/賣魚佬沖涼.md.',
    );
  });

  it('should return 1 when file name is missing', () => {
    const exitCode = main('testContentType', undefined);
    expect(exitCode).toBe(1);
    expect(console.error).toHaveBeenCalledWith(
      'Error: You must provide a content type and a file name as arguments.',
    );
    expect(console.error).toHaveBeenCalledWith(
      'Example: pnpm run gen:content idioms 賣魚佬沖涼, which will generate a new file at src/contents/idioms/賣魚佬沖涼.md.',
    );
  });

  it('should return 1 when content type is invalid', () => {
    const exitCode = main('invalidContentType', 'testFileName');
    expect(exitCode).toBe(1);
    expect(console.error).toHaveBeenCalledWith('Error: Invalid content type.');
    expect(console.error).toHaveBeenCalledWith(
      'Available content types: idioms',
    );
  });

  it('should return 1 when file already exists', () => {
    existsSyncMock.mockReturnValueOnce(true);
    const exitCode = main('idioms', 'testFileName');
    expect(exitCode).toBe(1);
    expect(console.error).toHaveBeenCalledWith(
      'Error: File "testFileName.md" already exists at src/contents/idioms/testFileName.md.',
    );
  });

  it.each(contentTypes)(
    'should return 0 when content type "%s" and file name are provided',
    (contentType) => {
      const exitCode = main(contentType, 'testFileName');
      expect(exitCode).toBe(0);
      expect(writeFileSyncMock).toHaveBeenCalledWith(
        `/mock-cwd/src/contents/${contentType}/testFileName.md`,
        templateProviders[contentType].generateTemplate(),
        'utf8',
      );
      expect(console.log).toHaveBeenCalledWith(
        `New ${contentType} generated at src/contents/${contentType}/testFileName.md.`,
      );
    },
  );
});

describe('toTemplate', () => {
  it('should generate a template from template object', () => {
    const template = toTemplate({
      id: '',
      a: 'test1',
      b: '',
      ccccc: 'test3',
      d: '',
    });
    const expectedTemplate = `---
id: aaaaaaaaaaaa
a: test1
b:
ccccc: test3
d:
---

`;
    expect(template).toBe(expectedTemplate);
  });

  it('should override the template id', () => {
    const template = toTemplate({
      id: 'testId',
      a: 'test1',
      b: '',
      ccccc: 'test3',
      d: '',
    });
    const expectedTemplate = `---
id: aaaaaaaaaaaa
a: test1
b:
ccccc: test3
d:
---

`;
    expect(template).toBe(expectedTemplate);
  });
});
