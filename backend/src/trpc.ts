import { getUserTrpcRoute } from './Routes/getUser'
import { getUsersTrpcRoute } from './Routes/getUsers'
import { trpc } from './lib/trpc'

export const trpcRouter = trpc.router({
  getUser: getUserTrpcRoute,
  getUsers: getUsersTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
