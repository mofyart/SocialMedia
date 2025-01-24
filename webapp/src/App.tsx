import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components'
import { AllPostsRoute, ViewUserProfileParams, ViewUserProfileRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllPosts } from './pages/AllPostsPage'
import { ViewUserProfile } from './pages/ViewUserProfilePage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={AllPostsRoute()} element={<AllPosts />} />
            <Route path={ViewUserProfileRoute(ViewUserProfileParams)} element={<ViewUserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
