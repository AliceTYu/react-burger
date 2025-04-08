
import { createAction } from "@reduxjs/toolkit";
import { IOrderFeedIng } from "../../utils/types";

export const connectFeed = createAction<string>("FEED_CONNECT");
export const disconnectFeed = createAction("FEED_DISCONNECT");
export const onFeedWsOpen = createAction("FEED_WS_OPEN");
export const onFeedWsClose = createAction("FEED_WS_CLOSE");
export const onFeedWsError = createAction<string>("FEED_WS_ERROR");
export const onFeedWsMessage = createAction<{
  orders: IOrderFeedIng[];
  total: number;
  totalToday: number;
}>("FEED_WS_MESSAGE");

export type FeedActions = ReturnType<typeof connectFeed> 
                          | ReturnType<typeof disconnectFeed> 
                          | ReturnType<typeof onFeedWsOpen> 
                          | ReturnType<typeof onFeedWsClose> 
                          | ReturnType<typeof onFeedWsError> 
                          | ReturnType<typeof onFeedWsMessage>
