import { trpc } from '../../lib/trpc'
import { zUdatePostTrpcInput } from './input'

export const updatePostTrpcRoute = trpc.procedure.input(zUdatePostTrpcInput).mutation(async ({ input, ctx }) => {
  const { postID, ...postInput } = input

  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }

  const post = await ctx.prisma.post.findUnique({
    where: {
      id: postID,
    },
  })

  if (!post) {
    throw new Error('NOT_FOUND')
  }

  if (ctx.me.id !== post.autrhorID) {
    throw new Error('NOT_YOUR_POST')
  }

  if (post.namePost !== input.namePost) {
    const exPost = await ctx.prisma.post.findUnique({
      where: {
        namePost: input.namePost,
      },
    })

    if (exPost) {
      throw new Error('Post with this name already exists')
    }
  }

  await ctx.prisma.post.update({
    where: {
      id: postID,
    },
    data: {
      ...postInput,
    },
  })

  return true
})
