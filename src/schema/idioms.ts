import { z } from 'zod';
import type { ContentData } from '@/lib/registry';

const jyutpingRegex = /^[a-z]{1,7}[1-6]( [a-z]{1,7}[1-6])*$/;

const IdSchema = z.string().regex(/^[a-zA-Z0-9]{12}$/, 'Invalid ID format');

export const IdiomFrontmatterSchema = z.object({
  id: IdSchema,
  term: z.string().min(1),
  termJyutping: z.string().regex(jyutpingRegex, 'Invalid Jyutping format'),
  answer: z.string().min(1),
  answerJyutping: z.string().regex(jyutpingRegex, 'Invalid Jyutping format'),
  type: z.literal('歇後語'),
});

export type IdiomFrontmatter = z.infer<typeof IdiomFrontmatterSchema>;

export type Idiom = ContentData<IdiomFrontmatter>;
