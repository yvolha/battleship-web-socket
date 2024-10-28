import { WebSocketServer, WebSocket } from "ws";

import { httpServer } from "./http_server/index.js";
import { createWsId } from "./ws_server/utils/create-id.js";
import { getHttpServerStartedMessage, getWsServerStartedMessage } from "./ws_server/utils/get-info-messages.js";
import { ERROR_MESSAGES } from "./ws_server/constants/error-messages.js";

export class CustomWebSocket extends WebSocket {
  id = createWsId();
}

process.on("SIGINT", () => {
  setImmediate(() => process.exit(0));
});

const WS_PORT = 3000;
export const wss = new WebSocketServer({
  port: WS_PORT,
  WebSocket: CustomWebSocket,
});

wss.on("listening", () => {
  console.log(getWsServerStartedMessage(WS_PORT));
});

wss.on("connection", function connection(wsClient) {
  try {
    wsClient.on("error", (err) => {
      console.log(ERROR_MESSAGES.UNKNOWN_ERROR, err.message);
    });

    wsClient.on("message", function message(data) {
      if (data !== null) {
       
      } else {
        console.log(ERROR_MESSAGES.NO_DATA_RECEIVED);
      }
    });

    wsClient.on("close", function () {
      console.log(ERROR_MESSAGES.CONNECTION_TERMINATED);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(ERROR_MESSAGES.UNKNOWN_ERROR, err.message);
    } else {
      console.log(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  }
});

const HTTP_PORT = 8181;
httpServer.listen(HTTP_PORT, () => {
  console.log(getHttpServerStartedMessage(HTTP_PORT));
});