import { Link } from 'react-router-dom'
import { ViewUserProfileRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllPosts = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getUsers.useQuery()
  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className = {css.users}>
      {data?.users.map((user) => {
        return (
          <div className = {css.user} key={user.nickName}>
            <h2 className = {css.userNickName}>
              <Link className = {css.userLink} to={ViewUserProfileRoute({ nickName: user.nickName })}>{user.nickName}</Link>
            </h2>
            <p className ={css.image}>{user.image}</p>
            <p className = {css.userDescryption}>{user.descryptionText}</p>
            <p className = {css.postData}>{user.data}</p>
          </div>
        )
      })}
    </div>
  )
}
