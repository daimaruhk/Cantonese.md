import { z } from 'zod';

const jyutpingRegex = /^[a-z]{1,7}[1-6]( [a-z]{1,7}[1-6])*$/;

export const JyutpingSchema = z
  .string()
  .regex(jyutpingRegex, 'Invalid Jyutping format');

const IdSchema = z.string().regex(/^[a-zA-Z0-9]{12}$/, 'Invalid ID format');

export const BaseFrontmatterSchema = z.object({
  id: IdSchema,
});
