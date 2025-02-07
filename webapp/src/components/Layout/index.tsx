import { Link, Outlet } from 'react-router-dom'
import { useMe } from '../../lib/ctx'
import { AddNewPostRoute, AllPostsRoute, SignUpRoute, SignInRoute, SignOutRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  const me = useMe()

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
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={AddNewPostRoute()}>
                  Add Post
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={SignOutRoute()}>
                  Log Out ({me.nick})
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
