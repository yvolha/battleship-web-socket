import { wss } from "../../../index.js";
import { WS_MESSAGE_TYPES } from "../../constants/message-types.js";
import { boardsDb } from "../../database/database.js";
import { IParsedMessage } from "../handle-message.type.js";

export const handleAttack = (parsedMessage: IParsedMessage) => {
    const { gameId, indexPlayer } = JSON.parse(parsedMessage.data.toString());
  
    const wsClientsIds = boardsDb.filter((e) => e.gameId === gameId).map((e) => e.userId);
  
    wss.clients.forEach((client) => {
      for (let i = 0; i < wsClientsIds.length; i++) {
        if (client.id !== indexPlayer) {
          client.send(
            JSON.stringify({
              type: WS_MESSAGE_TYPES.attack,
              data: JSON.stringify({
                currentPlayer: client.id,
              }),
              id: 0,
            })
          );
        }
      }
    });
  };