import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import { users } from '../../lib/users'

export const getUserTrpcRoute = trpc.procedure
  .input(
    z.object({
      nickName: z.string(),
    })
  )
  .query(({ input }) => {
    const user = users.find((user) => user.nickName === input.nickName)
    return { user: user || null }
  })
