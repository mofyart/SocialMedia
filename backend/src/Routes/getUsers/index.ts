import _ from 'lodash'
import { posts } from '../../lib/posts'
import { trpc } from '../../lib/trpc'

export const getUsersTrpcRoute = trpc.procedure.query(() => {
  return { users: posts.map((user) => _.pick(user, 'nickName', 'descryption', 'foto')) }
})
