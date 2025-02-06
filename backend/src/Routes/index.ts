import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import {${f.path.split('/').slice(0, -1).pop()}TrpcRoute} from '${f.path.split('/').slice(0,-1).join('/')}'`)
import { createPostTrpcRoute } from './createPost'
import { getMeTrpcRoute } from './getMe'
import { getUserTrpcRoute } from './getUser'
import { getUsersTrpcRoute } from './getUsers'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updatePostTrpcRoute } from './updatePost'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createPost: createPostTrpcRoute,
  getMe: getMeTrpcRoute,
  getUser: getUserTrpcRoute,
  getUsers: getUsersTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePost: updatePostTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
