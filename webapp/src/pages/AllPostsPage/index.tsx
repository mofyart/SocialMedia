import { trpc } from '../../lib/trpc';

export const AllPosts = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getUser.useQuery();
  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>AAATech & Co.</h1>
      {data?.users.map((user) => {
        return (
          <div key={user.nickName}>
            <h2>{user.nickName}</h2>
            <p>{user.descryptionText}</p>
            <p>{user.data}</p>
          </div>
        );
      })}
    </div>
  );
};
