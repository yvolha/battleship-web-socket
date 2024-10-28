import { RawData } from "ws";
import { ERROR_MESSAGES } from "../constants/error-messages";
import { CustomWebSocket } from "../../index";
import { WS_MESSAGE_TYPES } from "./handle-message.type";



export interface IParsedMessage {
  type: string;
  data: object;
  id: number;
}

export default async function handleMessage (rawData: RawData, wsClient: CustomWebSocket) {
  const parsedMessage: IParsedMessage = JSON.parse(rawData.toString());
  //onsole.log(parsedMessage);

  switch (parsedMessage.type) {
    case WS_MESSAGE_TYPES.reg:
      // handler
      break;

    case WS_MESSAGE_TYPES.create_room:
      // handler
      break;

    case WS_MESSAGE_TYPES.add_user_to_room:
      // handler
      break;

    case WS_MESSAGE_TYPES.add_ships:
      // handler
      break;

    case WS_MESSAGE_TYPES.attack:
      // handler
      break;

    case WS_MESSAGE_TYPES.randomAttack:
        // handler
      break;

    case WS_MESSAGE_TYPES.finish:
        // handler
      break;

    default:
      console.log(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};