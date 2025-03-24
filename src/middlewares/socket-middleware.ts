import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    Middleware,
} from "@reduxjs/toolkit";
import { RootState } from "../services/reducers/index";

export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
    return store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const {wsConnect,onOpen,onClose,onError,onMessage, wsDisconnect} = wsActions;

        if (wsConnect.match(action)) {
            const { payload } = action;
            socket = new WebSocket(payload);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch(onOpen());
          };
  
          socket.onerror = event => {
            dispatch(onError('Error'));
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch(onMessage(parsedData));
          };
  
          socket.onclose = event => {
            dispatch(onClose());
          };

          if (wsDisconnect.match(action)){
            socket.close()
          }
        }
  
        next(action);
      };
    };
  };