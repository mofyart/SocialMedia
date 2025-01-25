import { Link, Outlet } from 'react-router-dom'
import { AllPostsRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}> BusyginTech & Co. </div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={AllPostsRoute()}>
              All Posts
            </Link>
          </li>
        </ul>
      </div>
      <div className = {css.content}>
        <Outlet />
      </div>
    </div>
  )
}
