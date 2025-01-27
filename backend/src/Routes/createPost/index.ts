import { posts } from '../../lib/posts'
import { trpc } from '../../lib/trpc'
import { zCreatePostTrpcInput } from './input'

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(({ input }) => {
  if (posts.find((post) => post.foto === input.foto)) {
    throw Error('This foto used')
  }

  posts.unshift(input)
  return true
})
