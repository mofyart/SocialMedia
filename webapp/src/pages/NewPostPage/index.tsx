import { useState } from 'react'
import { Input } from '../../components/Input/index'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea/index'

export const AddNewPost = () => {
  const [state, setState] = useState({
    nickName: '',
    foto: '',
    text: '',
  })

  const onChangeName = (e: any) => {
    setState({ ...state, nickName: e.target.value })
  }
  const onChangeFoto = (e: any) => {
    setState({ ...state, foto: e.target.value })
  }

  return (
    <Segment title="New post">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info('Submitted', state)
        }}
      >
        <Input name="nickName" label="Nickname" state={state} onChange={onChangeName} />
        <Input name="foto" label="Foto" state={state} onChange={onChangeFoto} />

        <Textarea name="text" label="Text" state={state} setState={setState} />

        <button type="submit">Add post</button>
      </form>
    </Segment>
  )
}
