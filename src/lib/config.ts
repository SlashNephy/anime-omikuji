import { z } from 'zod'

const schema = z.object({
  aniListClientId: z.string(),
})

export const config = schema.parse({
  aniListClientId: import.meta.env.VITE_ANILIST_CLIENT_ID,
})
