import { zCreatePostTrpcInput } from '@socialmedia/backend/src/Routes/createPost/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
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
      nickName: '',
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
        <Input name="nickName" label="Nickname" formik={formik} />
        <Input name="foto" label="Foto" formik={formik} />
        <Input name="descryption" label="Descryption" formik={formik} />

        <Textarea name="text" label="Text" formik={formik} />

        {!!formik.submitCount && !formik.isValid && <div style={{ color: 'red' }}>Some fiels are invalid</div>}
        {!!submittingError && <div style={{ color: 'red' }}>{submittingError}</div>}
        {successMessageVisible && <div style={{ color: 'green' }}>Post successful added</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {' '}
          {formik.isSubmitting ? 'Submitting...' : 'Add post'}
        </button>
      </form>
    </Segment>
  )
}
