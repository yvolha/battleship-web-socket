import { WS_MESSAGE_TYPES } from "../../constants/message-types.js";
import { createGameId } from "../../utils/create-id.js";
import { getWsClientIdsInRoom } from "../../utils/get-ids-in-room.js";
import { getGameCreatedMessage } from "../../utils/get-success-messages.js";

export const handleCreateGame = (roomId: number) => {
    const usersInGame = getWsClientIdsInRoom(roomId);
  
    const idGame = createGameId();
  
    usersInGame.forEach((user) => {
      user.send(
        JSON.stringify({
          type: WS_MESSAGE_TYPES.create_game,
          data: JSON.stringify({
            idGame,
            idPlayer: user.id,
          }),
          id: 0,
        })
      );
    });
  
    console.log(getGameCreatedMessage(idGame));
  };