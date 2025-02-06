import { zCreatePostTrpcInput } from '@socialmedia/backend/src/Routes/createPost/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input/index'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea/index'
import { trpc } from '../../lib/trpc'

export const AddNewPost = () => {
  const createPost = trpc.createPost.useMutation()
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      namePost: '',
      foto: '',
      descryption: '',
      text: '',
    },
    validate: withZodSchema(zCreatePostTrpcInput),

    onSubmit: async (values) => {
      try {
        await createPost.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
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
        <FormItems>
          <Input name="namePost" label="Post name" formik={formik} />
          <Input name="foto" label="Foto" formik={formik} />
          <Input name="descryption" label="Descryption" formik={formik} maxWidth={500} />

          <Textarea name="text" label="Text" formik={formik} />

          {!!formik.submitCount && !formik.isValid && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Post successful added</Alert>}

          <Button loading={formik.isSubmitting}>Add post</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
