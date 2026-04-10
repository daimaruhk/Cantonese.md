import fs from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { main } from '@/scripts/generate-idiom';

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

  it('returns 0 when a valid term creates a new idiom file', () => {
    const term = '賣魚佬沖涼';
    const relativePath = `src/contents/idioms/${term}.md`;
    const destination = `${process.cwd()}/${relativePath}`;
    const outputFileContent = `---
id: aaaaaaaaaaaa
term: ${term}
termJyutping:
answer:
answerJyutping:
type: 歇後語
---

`;

    const exitCode = main(term);

    expect(exitCode).toBe(0);
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      destination,
      outputFileContent,
      'utf8',
    );
    expect(console.log).toHaveBeenCalledWith(
      `✅ Generated newly formatted idiom at: ${relativePath}`,
    );
  });

  it('returns 1 when the term argument is missing', () => {
    const exitCode = main(undefined);

    expect(exitCode).toBe(1);
    expect(writeFileSyncMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenNthCalledWith(
      1,
      '❌ Error: You must provide a file name as an argument.',
    );
    expect(console.error).toHaveBeenNthCalledWith(
      2,
      '👉 Example: pnpm run gen:idiom "賣魚佬沖涼"',
    );
  });

  it('returns 1 when the idiom file already exists', () => {
    existsSyncMock.mockReturnValue(true);

    const exitCode = main('賣魚佬沖涼');

    expect(exitCode).toBe(1);
    expect(writeFileSyncMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      '❌ Error: File already exists.',
    );
  });
});
