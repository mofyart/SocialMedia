const GetRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const AllPostsRoute = () => `/`

export const ViewUserProfileParams = GetRouteParams({ nickName: true })
export type typeViewUserProfileParams = typeof ViewUserProfileParams
export const ViewUserProfileRoute = ({ nickName }: typeViewUserProfileParams) => `users/${nickName}`
