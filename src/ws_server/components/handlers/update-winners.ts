import { wss } from "../../../index.js";
import { WS_MESSAGE_TYPES } from "../../constants/message-types.js";
import { winnersDb } from "../../database/database.js";

export const sendUpdateWinners = () => {
    wss.clients.forEach((wsClient) => {
      wsClient.send(
        JSON.stringify({
          type: WS_MESSAGE_TYPES.update_winners,
          data: JSON.stringify(winnersDb),
          id: 0,
        })
      );
    });
  };