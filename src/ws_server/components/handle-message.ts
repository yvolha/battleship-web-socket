import { RawData } from "ws";
import { ERROR_MESSAGES } from "../constants/error-messages";
import { CustomWebSocket } from "../../index";
import { IParsedMessage } from "./handle-message.type";
import { WS_MESSAGE_TYPES } from "../constants/message-types";
import { handleReg } from "./handlers/handle-reg";


export default async function handleMessage (rawData: RawData, wsClient: CustomWebSocket) {
  const parsedMessage: IParsedMessage = JSON.parse(rawData.toString());
  console.log(parsedMessage);

  switch (parsedMessage.type) {
    case WS_MESSAGE_TYPES.reg:
        handleReg(parsedMessage, wsClient, WS_MESSAGE_TYPES.reg);
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