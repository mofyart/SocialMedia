import { z } from 'zod'

export const zCreatePostTrpcInput = z.object({
  nickName: z
    .string()
    .min(1, 'Nickname is required')
    .regex(/^[a-z0-9-]+$/, 'Nickname can contain only lowercase letters, numbers and dashes'),
  foto: z.string().min(1, 'Foto is required'),
  descryption: z.string().min(1, 'Descryption is required'),
  text: z.string().min(100, 'Text should be at least 100 characters long'),
})
