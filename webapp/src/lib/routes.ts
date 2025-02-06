const GetRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const AddNewPostRoute = () => '/users/new'

export const AllPostsRoute = () => `/`

export const EditPostParams = GetRouteParams({ namePost: true })
export type typeEditPostParams = typeof EditPostParams
export const EditPostRoute = ({ namePost }: typeEditPostParams) => `/users/${namePost}/edit`

export const ViewUserProfileParams = GetRouteParams({ namePost: true })
export type typeViewUserProfileParams = typeof ViewUserProfileParams
export const ViewUserProfileRoute = ({ namePost }: typeViewUserProfileParams) => `/users/${namePost}`

export const SignUpRoute = () => '/sign-up'

export const SignInRoute = () => '/sign-in'

export const SignOutRoute = () => '/sign-out'
