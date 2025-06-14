import { StateCreator } from "zustand/vanilla";
import { SocketStoreState, initialState } from "./initialState";
import { createSocketSlice, SocketAction } from "./slices/socket";
import { createDevtools } from '../middleware/createDevTools';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

export type SocketStore = SocketStoreState &
    SocketAction

const createStore: StateCreator<SocketStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...createSocketSlice(...parameters),
});

const devtools = createDevtools('Socket');

export const useSocketStore = createWithEqualityFn<SocketStore>()(devtools(createStore), shallow);