import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { EditPostRoute, type typeViewUserProfileParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewUserProfile = () => {
  const { namePost } = useParams() as typeViewUserProfileParams
  const getMeResult = trpc.getMe.useQuery()
  const getPostResult = trpc.getUser.useQuery({ namePost })

  if (getPostResult.isLoading || getPostResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getPostResult.isError) {
    return <span>Error: {getPostResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getPostResult.data.post) {
    return <span>Post not found</span>
  }

  const me = getMeResult.data.me
  const post = getPostResult.data.post

  return (
    <Segment title={post.namePost} descryption={post.descryption}>
      <p className={css.iamge}>Image: {post.foto}</p>
      <div className={css.author}>Author: {post.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: post.text }}></div>
      <div className={css.createdAt}>Created At: {format(post.createdAt, 'yyyy-MM-dd')}</div>
      {me?.id === post.autrhorID && (
        <div className={css.editButton}>
          <LinkButton to={EditPostRoute({ namePost: post.namePost })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
}
