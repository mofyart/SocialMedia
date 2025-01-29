import { trpc } from '../../lib/trpc'

export const getUsersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const posts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      namePost: true,
      foto: true,
      descryption: true,
    },
  })

  return { posts }
})
