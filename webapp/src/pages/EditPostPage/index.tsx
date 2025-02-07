import type { TrpcRouterOutput } from '@socialmedia/backend/src/Routes'
import { zUdatePostTrpcInput } from '@socialmedia/backend/src/Routes/updatePost/input'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useMe } from '../../lib/ctx'
import { useForm } from '../../lib/form'
import { type typeEditPostParams, ViewUserProfileRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditPostComponent = ({ post }: { post: NonNullable<TrpcRouterOutput['getUser']['post']> }) => {
  const navigate = useNavigate()
  const updatePost = trpc.updatePost.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(post, ['namePost', 'foto', 'descryption', 'text']),

    validationSchema: zUdatePostTrpcInput.omit({ postID: true }),

    onSubmit: async (values) => {
      await updatePost.mutateAsync({ postID: post.id, ...values })
      await navigate(ViewUserProfileRoute({ namePost: values.namePost }))
    },

    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Post: ${post.namePost}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="namePost" label="Post name" formik={formik} />
          <Input name="foto" label="Foto" formik={formik} />
          <Input name="descryption" label="Descryption" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Update post</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditPost = () => {
  const { namePost } = useParams() as typeEditPostParams

  const getPostResult = trpc.getUser.useQuery({ namePost })
  const me = useMe()

  if (getPostResult.isLoading || getPostResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getPostResult.isError) {
    return <span>Error: {getPostResult.error.message}</span>
  }

  const post = getPostResult.data.post

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== post?.autrhorID) {
    return <span>An post can only be edited by the author</span>
  }

  return <EditPostComponent post={post} />
}
