import { useFormik } from 'formik'
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

        <button type="submit">Add post</button>
      </form>
    </Segment>
  )
}
