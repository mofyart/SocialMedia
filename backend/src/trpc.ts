import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const trpc = initTRPC.create()

const users = _.times(100, (i) => ({
  nickName: `User ${i}`,
  descryptionText: `Текст ${i}......`,
  data: '21.01.2025',
  image: `Image ${i}`,
  subscribes: `${i}`,
  subscriptions: `${i + 50}`,
  text: _.times(100, (j) => `<p>Text paragrph ${j} of user ${i}...</p>`).join(''),
}))

export const trpcRouter = trpc.router({
  getUsers: trpc.procedure.query(() => {
    return { users: users.map((user) => _.pick(user, 'nickName', 'descryptionText', 'data', 'image')) }
  }),
  getUser: trpc.procedure
    .input(
      z.object({
        nickName: z.string(),
      })
    )
    .query(({ input }) => {
      const user = users.find((user) => user.nickName === input.nickName)
      return { user: user || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
