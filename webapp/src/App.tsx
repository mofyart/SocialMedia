export const App = () => {
  const users = [
    {
      nickName: 'MOFY',
      descryptionText: 'Текст 1......',
      data: '21.01.2025',
      image: '.PDF',
    },
    {
      nickName: 'ALESIO',
      descryptionText: 'Текст 2......',
      data: '17.04.2024',
      image: '.PDF',
    },
    {
      nickName: 'ANDREY',
      descryptionText: 'Текст 3......',
      data: '16.02.2025',
      image: '.PDF',
    },
  ];

  return (
    <div>
      <h1>AAATech & Co.</h1>
      {users.map((user) => {
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
