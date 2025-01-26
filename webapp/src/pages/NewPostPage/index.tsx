import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '../../components/Input/index'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea/index'

export const AddNewPost = () => {
  const formik = useFormik({
    initialValues: {
      nickName: '',
      foto: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        nickName: z
          .string()
          .min(1, 'Nickname is required')
          .regex(/^[a-z0-9-]+$/, 'Nickname can contain only lowercase letters, numbers and dashes'),
        foto: z.string().min(1, 'Nickname is required'),
        text: z.string().min(100, 'Text should be at least 100 characters long'),
      })
    ),
    // validate: (values) => {
    //   const errors: Partial<typeof values> = {}
    //   if (!values.nickName) {
    //     errors.nickName = 'Nickname is required'
    //   } else if (!values.nickName.match(/^[a-z0-9-]+$/)) {
    //     errors.nickName = 'Nickname can contain only lowercase letters, numbers and dashes'
    //   }
    //   if (!values.foto) {
    //     errors.foto = 'Foto is required'
    //   }
    //   if (!values.text) {
    //     errors.text = 'Text is required'
    //   } else if (values.text.length < 100) {
    //     errors.text = 'Text should be at least 100 characters long'
    //   }
    //   return errors
    // },
    onSubmit: (values) => {
      console.info('Submitted', values)
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

        <Textarea name="text" label="Text" formik={formik} />
        {!!formik.submitCount && !formik.isValid && <div style={{ color: 'red' }}>Some fiels are invalid</div>}
        <button type="submit">Add post</button>
      </form>
    </Segment>
  )
}
