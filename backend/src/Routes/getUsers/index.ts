import { trpc } from '../../lib/trpc'

export const getUsersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const posts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      namePost: true,
      descryption: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { posts }
})
