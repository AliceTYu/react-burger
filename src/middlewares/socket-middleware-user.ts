import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { RootState } from "../services/reducers/index";

export type TWsActionTypesUser = {
  wsConnectUser: ActionCreatorWithPayload<string>;
  wsDisconnectUser: ActionCreatorWithoutPayload;
  onOpenUser: ActionCreatorWithoutPayload;
  onCloseUser: ActionCreatorWithoutPayload;
  onErrorUser: ActionCreatorWithPayload<string>;
  onMessageUser: ActionCreatorWithPayload<any>;
};

export const socketMiddlewareUser = (wsActions: TWsActionTypesUser): Middleware<{}, RootState> => {
  return store => {
      let socket: WebSocket | null = null;

      return next => action => {
          const { dispatch } = store;
          const { wsConnectUser, onOpenUser, onCloseUser, onErrorUser, onMessageUser, wsDisconnectUser } = wsActions;

          if (wsConnectUser.match(action)) {
              const url = action.payload;

              if (socket) {
                socket.close();
              }

              socket = new WebSocket(url);

              socket.onopen = () => {
                  dispatch(onOpenUser());
              };

              socket.onerror = () => {
                  dispatch(onErrorUser('WebSocket error'));
              };

              socket.onmessage = (event) => {
                  try {
                      const parsedData = JSON.parse(event.data);
                      if (parsedData.message === 'Invalid or missing token') {
                          dispatch(onErrorUser('Invalid or missing token'));
                          socket?.close();
                          return;
                      }
                      dispatch(onMessageUser(parsedData));
                  } catch (err) {
                      dispatch(onErrorUser('Failed to parse message'));
                  }
              };

              socket.onclose = () => {
                  dispatch(onCloseUser());
              };
          }

          if (wsDisconnectUser.match(action) && socket) {
              socket.close();
              socket = null;
          }

          next(action);
      };
  };
};