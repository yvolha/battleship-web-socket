import { wss } from "../../../index";
import { WS_MESSAGE_TYPES } from "../../constants/message-types";
import { winnersDb } from "../../database/database";

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