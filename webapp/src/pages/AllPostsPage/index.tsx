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
      {data?.posts.map((user) => {
        return (
          <div className={css.user} key={user.namePost}>
            <Segment
              title={
                <Link className={css.userLink} to={ViewUserProfileRoute({ namePost: user.namePost })}>
                  {user.namePost}
                </Link>
              }
              size={2}
              descryption={user.descryption}
            >
              <p className={css.image}>{user.foto}</p>
            </Segment>
          </div>
        )
      })}
    </div>
  )
}
