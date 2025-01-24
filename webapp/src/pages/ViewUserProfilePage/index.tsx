import { useParams } from 'react-router-dom'
import { type typeViewUserProfileParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const ViewUserProfile = () => {
  const { nickName } = useParams() as typeViewUserProfileParams
  const { data, error, isLoading, isFetching, isError } = trpc.getUser.useQuery({ nickName })
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data?.user) {
    return <span>Error: don`t find user</span>
  }

  return (
    <div>
      <h1>{data.user.nickName}</h1>
      <div>
        <p>Subscribes: {data.user.subscribes}</p>
        <p>Subscriptions: {data.user.subscriptions}</p>
        <div>
          <p>Image: {data.user.image}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.user.text }}></div>
      </div>
    </div>
  )
}
