import { createReducer } from '@reduxjs/toolkit';
import { IOrderFeedIng } from '../../utils/types';
import { connectFeedUser, disconnectFeedUser, onFeedWsCloseUser, onFeedWsErrorUser, onFeedWsMessageUser, onFeedWsOpenUser } from '../actions/feedActionsUser';


interface FeedState {
  wsConnected: boolean;
  orders: IOrderFeedIng[];
  total: number;
  totalToday: number;
  error: string | null;
}

export const initialState: FeedState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};


export const feedReducerUser = createReducer(initialState, (builder) => {
  builder
    .addCase(connectFeedUser, (state) => {
      state.wsConnected = false;
      state.error = null;
    })
    .addCase(disconnectFeedUser, (state) => {
      state.wsConnected = false;
      state.error = null;
    })
    .addCase(onFeedWsOpenUser, (state) => {
      state.wsConnected = true;
      state.error = null;
    })
    .addCase(onFeedWsCloseUser, (state) => {
      state.wsConnected = false;
      state.error = null;
    })
    .addCase(onFeedWsErrorUser, (state, action) => {
      state.error = action.payload;
    })
    .addCase(onFeedWsMessageUser, (state, action) => {      
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.error = null; 
    });
});
