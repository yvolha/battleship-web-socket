import { wss } from "../../../index.js";
import { WS_MESSAGE_TYPES } from "../../constants/message-types.js";
import { roomsDb } from "../../database/database.js";

export const sendAvailableRooms = () => {
    wss.clients.forEach((wsClient) => {
      wsClient.send(
        JSON.stringify({
          type: WS_MESSAGE_TYPES.update_room,
          data: JSON.stringify(roomsDb),
          id: 0,
        })
      );
    });
  };