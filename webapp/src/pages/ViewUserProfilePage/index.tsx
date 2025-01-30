import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type typeViewUserProfileParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewUserProfile = () => {
  const { namePost } = useParams() as typeViewUserProfileParams
  const { data, error, isLoading, isFetching, isError } = trpc.getUser.useQuery({ namePost })
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data?.post) {
    return <span>Error: don`t find user</span>
  }

  return (
    <Segment title={data.post.namePost} nick={data.post.nickName} descryption={data.post.descryption}>
      <p className={css.iamge}>Image: {data.post.foto}</p>
      <div className={css.createdAt}>Created At: {format(data.post.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.post.text }}></div>
    </Segment>
  )
}
