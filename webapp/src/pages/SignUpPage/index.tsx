import { zSignUpTrpcInput } from '@socialmedia/backend/src/Routes/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { AllPostsRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignUp = () => {
  const signUp = trpc.signUp.useMutation()
  const trpcUtils = trpc.useContext()
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords must be the same',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        void navigate(AllPostsRoute())
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
