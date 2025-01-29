import { trpc } from '../../lib/trpc'
import { zCreatePostTrpcInput } from './input'

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(async ({ input, ctx }) => {
  const exPost = await ctx.prisma.post.findUnique({
    where: {
      namePost: input.namePost,
    },
  })

  if (exPost) {
    throw Error('Post with this name already exists')
  }

  await ctx.prisma.post.create({
    data: input,
  })
})
