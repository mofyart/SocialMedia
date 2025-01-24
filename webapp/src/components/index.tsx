import { Link, Outlet } from 'react-router-dom'
import { AllPostsRoute } from '../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <h1>BusyginTech & Co.</h1>
      </p>
      <ul>
        <li>
          <Link to={AllPostsRoute()}>All Posts</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
