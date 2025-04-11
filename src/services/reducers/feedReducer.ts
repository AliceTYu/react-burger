import { createReducer } from '@reduxjs/toolkit';
import { IOrderFeedIng } from '../../utils/types';
import { connectFeed, disconnectFeed, onFeedWsClose, onFeedWsError, onFeedWsMessage, onFeedWsOpen } from '../actions/feedActions';


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


export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connectFeed, (state) => {
      state.wsConnected = false;
      state.error = null;
    })
    .addCase(disconnectFeed, (state) => {
      state.wsConnected = false;
      state.error = null;
    })
    .addCase(onFeedWsOpen, (state) => {
      state.wsConnected = true;
      state.error = null;
    })
    .addCase(onFeedWsClose, (state) => {
      state.wsConnected = false;
      state.error = null;
    })
    .addCase(onFeedWsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(onFeedWsMessage, (state, action) => {      
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.error = null; 
    });
});
