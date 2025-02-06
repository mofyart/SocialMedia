import type { TrpcRouterOutput } from '@socialmedia/backend/src/Routes'
import { zUdatePostTrpcInput } from '@socialmedia/backend/src/Routes/updatePost/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { pick } from 'lodash'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { type typeEditPostParams, ViewUserProfileRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditPostComponent = ({ post }: { post: NonNullable<TrpcRouterOutput['getUser']['post']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updatePost = trpc.updatePost.useMutation()

  const formik = useFormik({
    initialValues: pick(post, ['namePost', 'foto', 'descryption', 'text']),

    validate: withZodSchema(zUdatePostTrpcInput.omit({ postID: true })),

    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updatePost.mutateAsync({ postID: post.id, ...values })
        await navigate(ViewUserProfileRoute({ namePost: values.namePost }))
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title={`Edit Post: ${post.namePost}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="namePost" label="Post name" formik={formik} />
          <Input name="foto" label="Foto" formik={formik} />
          <Input name="descryption" label="Descryption" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          {!!formik.submitCount && !formik.isValid && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update post</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditPost = () => {
  const { namePost } = useParams() as typeEditPostParams

  const getPostResult = trpc.getUser.useQuery({ namePost })
  const getMeResult = trpc.getMe.useQuery()

  if (getMeResult.isFetching || getMeResult.isLoading || getPostResult.isLoading || getPostResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (getPostResult.isError) {
    return <span>Error: {getPostResult.error.message}</span>
  }

  const me = getMeResult.data.me
  const post = getPostResult.data.post

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== post?.autrhorID) {
    return <span>An post can only be edited by the author</span>
  }

  return <EditPostComponent post={post} />
}
