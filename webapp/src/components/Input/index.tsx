import { type ChangeEvent } from 'react'

export const Input = ({
  name,
  label,
  state,
  onChange,
}: {
  name: string
  label: string
  state: Record<string, any>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input type="text" value={state[name]} name={label} id={label} onChange={onChange} />
    </div>
  )
}
