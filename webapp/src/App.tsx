import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllPosts } from './pages/AllPostsPage'
import { AddNewPost } from './pages/NewPostPage'
import { ViewUserProfile } from './pages/ViewUserProfilePage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.AllPostsRoute()} element={<AllPosts />} />
            <Route path={routes.AddNewPostRoute()} element={<AddNewPost />} />
            <Route path={routes.ViewUserProfileRoute(routes.ViewUserProfileParams)} element={<ViewUserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
