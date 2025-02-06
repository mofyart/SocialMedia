import { z } from 'zod'

import { trpc } from '../../lib/trpc'

export const getUserTrpcRoute = trpc.procedure
  .input(
    z.object({
      namePost: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      where: {
        namePost: input.namePost,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    })
    return { post }
  })
