import { trpc } from '../lib/trpc'
import { getUserTrpcRoute } from './getUser'
import { getUsersTrpcRoute } from './getUsers'

export const trpcRouter = trpc.router({
  getUser: getUserTrpcRoute,
  getUsers: getUsersTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
