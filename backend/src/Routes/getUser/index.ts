import { z } from 'zod'

import { trpc } from '../../lib/trpc'

export const getUserTrpcRoute = trpc.procedure
  .input(
    z.object({
      namePost: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const user = await ctx.prisma.post.findUnique({
      where: {
        namePost: input.namePost,
      },
    })
    return { user }
  })
