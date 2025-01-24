import { Link } from 'react-router-dom'
import { ViewUserProfileRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const AllPosts = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getUsers.useQuery()
  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      {data?.users.map((user) => {
        return (
          <div key={user.nickName}>
            <h2>
              <Link to={ViewUserProfileRoute({ nickName: user.nickName })}>{user.nickName}</Link>
            </h2>
            <p>{user.descryptionText}</p>
            <p>{user.data}</p>
          </div>
        )
      })}
    </div>
  )
}
