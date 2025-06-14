import { SocketState, initialSocketState } from './slices/socket';

export type SocketStoreState = SocketState;

export const initialState: SocketStoreState = {
  ...initialSocketState,
};
