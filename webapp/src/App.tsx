import { TrpcProvider } from './lib/trpc';
import { AllPosts } from './pages/AllPostsPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AllPosts />
    </TrpcProvider>
  );
};
