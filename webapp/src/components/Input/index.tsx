import cn from 'classnames'
import { type FormikProps } from 'formik'
import css from './index.module.scss'

export const Input = ({
  name,
  label,
  formik,
  maxWidth,
}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touch = formik.touched[name]
  const disabled = formik.isSubmitting
  const invalid = !!error && !!touch

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <br />
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        style={{ maxWidth }}
        value={value}
        name={label}
        id={label}
        disabled={formik.isSubmitting}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
