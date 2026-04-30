import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const CHAR_CSV_URL =
  'https://raw.githubusercontent.com/CanCLID/rime-cantonese-upstream/refs/heads/main/char.csv';
const WORD_CSV_URL =
  'https://raw.githubusercontent.com/CanCLID/rime-cantonese-upstream/refs/heads/main/word.csv';
const OUTPUT_PATH = path.join(
  process.cwd(),
  'public',
  'api',
  'dictionary.json',
);
const DEFAULT_TYPE = '預設';

type CharEntry = {
  character: string;
  jyutping: string;
  isDefault: boolean;
};

type WordEntry = {
  phrase: string;
  jyutping: string;
};

// Internal mutable trie node used during construction
type TrieNode = {
  j?: string; // comma-separated phrase jyutping at this node
  [key: string]: string | TrieNode | undefined; // children
};

type Dictionary = Record<string, TrieNode>;

const parseCharCsv = (raw: string): CharEntry[] => {
  const lines = raw.split('\n').slice(1); // skip header

  return lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [character, jyutping, pronRank] = line.split(',');
      return {
        character: character!,
        jyutping: jyutping!,
        isDefault: pronRank === DEFAULT_TYPE,
      };
    });
};

const parseWordCsv = (raw: string): WordEntry[] => {
  const lines = raw.split('\n').slice(1); // skip header

  return lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // Split on first comma only — jyutping may not contain commas,
      // but this is safer for consistency
      const commaIndex = line.indexOf(',');
      return {
        phrase: line.slice(0, commaIndex),
        jyutping: line.slice(commaIndex + 1),
      };
    });
};

const buildCharacterMap = (entries: CharEntry[]): Dictionary => {
  const dictionary: Dictionary = {};

  for (const { character, jyutping, isDefault } of entries) {
    if (!dictionary[character]) {
      dictionary[character] = {};
    }

    const node = dictionary[character]!;
    const jyutpings: string[] = node.j ? node.j.split(',') : [];

    // Default readings go to the front of the array
    if (isDefault) {
      jyutpings.unshift(jyutping);
    } else {
      jyutpings.push(jyutping);
    }

    node.j = jyutpings.join(',');
  }

  return dictionary;
};

const insertPhrase = (
  dictionary: Dictionary,
  phrase: string,
  jyutping: string,
) => {
  const chars = [...phrase]; // proper Unicode split
  if (chars.length < 2) return; // single chars handled by char.csv

  const firstChar = chars[0]!;
  const topNode = dictionary[firstChar];

  if (!topNode) {
    return;
  }

  let current = topNode;
  for (let i = 1; i < chars.length; i++) {
    const ch = chars[i]!;
    if (!current[ch]) {
      current[ch] = {};
    }
    current = current[ch] as TrieNode;
  }

  current.j = jyutping;
};

const compactTrie = (node: TrieNode): TrieNode | string => {
  const keys = Object.keys(node).filter((k) => k !== 'j');
  const hasChildren = keys.length > 0;
  const hasJyutping = node.j !== undefined;

  if (hasJyutping && !hasChildren) {
    // Leaf only → collapse to string
    return node.j!;
  }

  const result: TrieNode = {};
  if (hasJyutping) {
    result.j = node.j;
  }

  for (const key of keys) {
    result[key] = compactTrie(node[key] as TrieNode);
  }

  return result;
};

const fetchCsv = async (url: string, label: string): Promise<string> => {
  console.log(`Fetching ${label}...`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Fetch ${label} failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
};

export const main = async () => {
  try {
    // Fetch both CSVs in parallel
    const [charRaw, wordRaw] = await Promise.all([
      fetchCsv(CHAR_CSV_URL, 'character data'),
      fetchCsv(WORD_CSV_URL, 'phrase data'),
    ]);

    console.log('Processing character entries...');
    const charEntries = parseCharCsv(charRaw);
    const dictionary = buildCharacterMap(charEntries);

    console.log('Processing phrase entries...');
    const wordEntries = parseWordCsv(wordRaw);
    let phraseCount = 0;
    for (const { phrase, jyutping } of wordEntries) {
      insertPhrase(dictionary, phrase, jyutping);
      phraseCount++;
    }

    for (const [k, v] of Object.entries(dictionary)) {
      dictionary[k] = compactTrie(v) as TrieNode;
    }

    const outputDir = path.dirname(OUTPUT_PATH);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(dictionary), 'utf8');

    const characterCount = Object.keys(dictionary).length;
    console.log(
      `✅ Saved ${characterCount} characters + ${phraseCount} phrases to public/api/dictionary.json`,
    );

    return 0;
  } catch (error) {
    console.error('❌ Failed to generate dictionary:', error);
    return 1;
  }
};

const entryPointPath = process.argv[1];

if (entryPointPath && import.meta.url === pathToFileURL(entryPointPath).href) {
  main().then((code) => {
    process.exitCode = code;
  });
}
