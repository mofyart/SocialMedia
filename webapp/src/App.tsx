import { TrpcProvider } from './lib/trpc';
import { AllPosts } from './pages/AllPostsPage';
if (Math.random()) {
  console.info('ddwdwasdd');
}
export const App = () => {
  return (
    <TrpcProvider>
      <AllPosts />
    </TrpcProvider>
  );
};
