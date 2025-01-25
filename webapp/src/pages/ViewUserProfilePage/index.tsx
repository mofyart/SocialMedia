import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type typeViewUserProfileParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

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
    <Segment title={data.user.nickName}>
      <p className={css.subscribes}>Subscribes: {data.user.subscribes}</p>
      <p className={css.subscriptions}>Subscriptions: {data.user.subscriptions}</p>
      <div>
        <p className={css.iamge}>Image: {data.user.image}</p>
      </div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.user.text }}></div>
    </Segment>
  )
}
