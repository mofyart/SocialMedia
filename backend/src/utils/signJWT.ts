import jwt from 'jsonwebtoken'
import { env } from '../lib/env'

export const signJWT = (userID: string): string => {
  return jwt.sign(userID, env.JWT_SECRET)
}
