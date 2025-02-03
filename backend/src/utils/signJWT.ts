import jwt from 'jsonwebtoken'

export const signJWT = (userID: string): string => {
  return jwt.sign(userID, 'not-really-secret-jwt-key')
}
