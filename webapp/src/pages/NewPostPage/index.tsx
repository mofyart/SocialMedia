import { zCreatePostTrpcInput } from '@socialmedia/backend/src/Routes/createPost/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input/index'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea/index'
import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

export const AddNewPost = () => {
  const createPost = trpc.createPost.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      namePost: '',
      foto: '',
      descryption: '',
      text: '',
    },
    validationSchema: zCreatePostTrpcInput,

    onSubmit: async (values) => {
      await createPost.mutateAsync(values)
    },

    successMessage: 'Post created',
    showValidationAlert: true,
  })

  return (
    <Segment title="New post">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="namePost" label="Post name" formik={formik} />
          <Input name="foto" label="Foto" formik={formik} />
          <Input name="descryption" label="Descryption" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Add post</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
