import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignOut = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()

  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      void navigate(SignInRoute())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>Loading...</p>
}
