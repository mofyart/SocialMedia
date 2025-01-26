import { zCreatePostTrpcInput } from '@socialmedia/backend/src/Routes/createPost/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Input } from '../../components/Input/index'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea/index'
import { trpc } from '../../lib/trpc'

export const AddNewPost = () => {
  const createPost = trpc.createPost.useMutation()

  const formik = useFormik({
    initialValues: {
      nickName: '',
      foto: '',
      descryption: '',
      text: '',
    },
    validate: withZodSchema(zCreatePostTrpcInput),

    onSubmit: async (values) => {
      await createPost.mutateAsync(values)
    },
  })

  return (
    <Segment title="New post">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="nickName" label="Nickname" formik={formik} />
        <Input name="foto" label="Foto" formik={formik} />
        <Input name="descryption" label="Descryption" formik={formik} />

        <Textarea name="text" label="Text" formik={formik} />

        {!!formik.submitCount && !formik.isValid && <div style={{ color: 'red' }}>Some fiels are invalid</div>}
        <button type="submit">Add post</button>
      </form>
    </Segment>
  )
}
