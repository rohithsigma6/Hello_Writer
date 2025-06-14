import { SocketStoreState } from '@/store/socket/initialState';

const socket = (s: SocketStoreState) => s.socket;
export const socketSelectors = {
  socket,
};
