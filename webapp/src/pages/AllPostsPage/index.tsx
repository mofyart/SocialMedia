import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
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
    <div className={css.users}>
      {data?.users.map((user) => {
        return (
          <div className={css.user} key={user.nickName}>
            <Segment
              title={
                <Link className={css.userLink} to={ViewUserProfileRoute({ nickName: user.nickName })}>
                  {user.nickName}
                </Link>
              }
              size={2}
              description={user.descryptionText}
            >
              <p className={css.image}>{user.image}</p>
              <p className={css.postData}>{user.data}</p>
            </Segment>
          </div>
        )
      })}
    </div>
  )
}
