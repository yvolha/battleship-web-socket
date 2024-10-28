import { RawData } from "ws";
import { ERROR_MESSAGES } from "../constants/error-messages.js";
import { CustomWebSocket } from "../../index.js";
import { IParsedMessage } from "./handle-message.type.js";
import { WS_MESSAGE_TYPES } from "../constants/message-types.js";
import { handleReg } from "./handlers/handle-reg.js";
import { handleCreateRoom } from "./handlers/handle-create-room.js";
import { handleAddUserToRoom } from "./handlers/handle-add-user-to-room.js";
import { handleAttack } from "./handlers/handle-attack.js";
import { handleAddShips } from "./handlers/handle-add-ships.js";

export default async function handleMessage (rawData: RawData, wsClient: CustomWebSocket) {
  const parsedMessage: IParsedMessage = JSON.parse(rawData.toString());
  console.log(parsedMessage);

  switch (parsedMessage.type) {
    case WS_MESSAGE_TYPES.reg:
        handleReg(parsedMessage, wsClient, WS_MESSAGE_TYPES.reg);
        break;

    case WS_MESSAGE_TYPES.create_room:
        handleCreateRoom(wsClient);
      break;

    case WS_MESSAGE_TYPES.add_user_to_room:
        handleAddUserToRoom(parsedMessage, wsClient);
        break;

    case WS_MESSAGE_TYPES.add_ships:
        handleAddShips(parsedMessage);
        break;

    case WS_MESSAGE_TYPES.attack:
        handleAttack(parsedMessage);
        break;

    case WS_MESSAGE_TYPES.randomAttack:
        // handler
      break;
    
    case WS_MESSAGE_TYPES.single_play:
    // handler
    break;

    case WS_MESSAGE_TYPES.finish:
        // handler
      break;

    default:
      console.log(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};