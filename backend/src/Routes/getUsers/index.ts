import _ from 'lodash'
import { trpc } from '../../lib/trpc'
import { users } from '../../lib/users'

export const getUsersTrpcRoute = trpc.procedure.query(() => {
  return { users: users.map((user) => _.pick(user, 'nickName', 'descryptionText', 'data', 'image')) }
})
