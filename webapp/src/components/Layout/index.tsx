import { Link, Outlet } from 'react-router-dom'
import { AddNewPostRoute, AllPostsRoute, SignUpRoute, SignInRoute, SignOutRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}> QuBitTech & Co. </div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={AllPostsRoute()}>
              All Posts
            </Link>
          </li>
          {isLoading || isFetching || isError ? null : data.me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={AddNewPostRoute()}>
                  Add Post
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={SignOutRoute()}>
                  Log Out ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={SignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={SignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
