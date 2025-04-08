
import { createAction } from "@reduxjs/toolkit";
import { IOrderFeedIng } from "../../utils/types";

export const connectFeedUser = createAction<string>("FEED_CONNECT_USER");
export const disconnectFeedUser = createAction("FEED_DISCONNECT_USER");
export const onFeedWsOpenUser = createAction("FEED_WS_OPEN_USER");
export const onFeedWsCloseUser = createAction("FEED_WS_CLOSE_USER");
export const onFeedWsErrorUser = createAction<string>("FEED_WS_ERROR_USER");
export const onFeedWsMessageUser = createAction<{
  orders: IOrderFeedIng[];
  total: number;
  totalToday: number;
}>("FEED_WS_MESSAGE_USER");

export type FeedActionsUser = ReturnType<typeof connectFeedUser> 
                          | ReturnType<typeof disconnectFeedUser> 
                          | ReturnType<typeof onFeedWsOpenUser> 
                          | ReturnType<typeof onFeedWsCloseUser> 
                          | ReturnType<typeof onFeedWsErrorUser> 
                          | ReturnType<typeof onFeedWsMessageUser>
