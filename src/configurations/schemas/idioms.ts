import { z } from 'zod';
import { BaseFrontmatterSchema, JyutpingSchema } from './baseSchema';

export const IdiomFrontmatterSchema = BaseFrontmatterSchema.extend({
  term: z.string().min(1),
  termJyutping: JyutpingSchema,
  answer: z.string().min(1),
  answerJyutping: JyutpingSchema,
});

export type IdiomFrontmatter = z.infer<typeof IdiomFrontmatterSchema>;
