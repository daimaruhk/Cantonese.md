import { z } from 'zod';
import { BaseFrontmattrerSchema, JyutpingSchema } from './baseSchema';

export const IdiomFrontmatterSchema = BaseFrontmattrerSchema.extend({
  term: z.string().min(1),
  termJyutping: JyutpingSchema,
  answer: z.string().min(1),
  answerJyutping: JyutpingSchema,
});

export type IdiomFrontmatter = z.infer<typeof IdiomFrontmatterSchema>;
