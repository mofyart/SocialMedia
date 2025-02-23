import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllPosts } from './pages/AllPostsPage'
import { EditPost } from './pages/EditPostPage'
import { AddNewPost } from './pages/NewPostPage'
import { SignIn } from './pages/SignInPage'
import { SignOut } from './pages/SignOutPage'
import { SignUp } from './pages/SignUpPage'
import { ViewUserProfile } from './pages/ViewUserProfilePage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.SignOutRoute()} element={<SignOut />}></Route>
            <Route element={<Layout />}>
              <Route path={routes.SignInRoute()} element={<SignIn />} />
              <Route path={routes.SignUpRoute()} element={<SignUp />} />
              <Route path={routes.AllPostsRoute()} element={<AllPosts />} />
              <Route path={routes.AddNewPostRoute()} element={<AddNewPost />} />
              <Route path={routes.ViewUserProfileRoute(routes.ViewUserProfileParams)} element={<ViewUserProfile />} />
              <Route path={routes.EditPostRoute(routes.EditPostParams)} element={<EditPost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
