import { z } from 'zod'

import { posts } from '../../lib/posts'
import { trpc } from '../../lib/trpc'

export const getUserTrpcRoute = trpc.procedure
  .input(
    z.object({
      nickName: z.string(),
    })
  )
  .query(({ input }) => {
    const user = posts.find((post) => post.nickName === input.nickName)
    return { user: user || null }
  })
