import { z } from 'zod';

const jyutpingRegex = /^[a-z]{1,7}[1-6]( [a-z]{1,7}[1-6])*$/;

const IdSchema = z.string().regex(/^[a-zA-Z0-9]{12}$/, 'Invalid ID format');

export const IdiomSchema = z.object({
  id: IdSchema,
  term: z.string().min(1),
  termJyutping: z.string().regex(jyutpingRegex, 'Invalid Jyutping format'),
  answer: z.string().min(1),
  answerJyutping: z.string().regex(jyutpingRegex, 'Invalid Jyutping format'),
  type: z.literal('歇後語'),
});

export type Idiom = z.infer<typeof IdiomSchema>;

export type IdiomData = Idiom & {
  content: string;
  contributors: string[];
  createdAt: string;
  updatedAt: string;
};
