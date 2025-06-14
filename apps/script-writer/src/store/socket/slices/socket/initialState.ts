import {  Socket } from 'socket.io-client';
export interface SocketState {
  socket: Socket | null;
}

export const initialSocketState: SocketState = {
 socket:null
};
