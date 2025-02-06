import { z } from 'zod'
import { zCreatePostTrpcInput } from '../createPost/input'

export const zUdatePostTrpcInput = zCreatePostTrpcInput.extend({
  postID: z.string().min(1),
})
