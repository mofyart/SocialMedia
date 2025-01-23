import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

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
const x:boolean = 1;
export const trpcRouter = trpc.router({
  getUser: trpc.procedure.query(() => {
    return { users };
  }),
});

export type TrpcRouter = typeof trpcRouter;
