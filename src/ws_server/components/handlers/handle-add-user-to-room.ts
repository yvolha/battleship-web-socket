import { CustomWebSocket } from "../../../index.js";
import { roomsDb, usersDb } from "../../database/database.js";
import { IParsedMessage } from "../handle-message.type.js";
import { handleCreateGame } from "./handle-create-game.js";
import { sendAvailableRooms } from "./update-rooms.js";

export const handleAddUserToRoom = async (
    parsedMessage: IParsedMessage,
    wsClient: CustomWebSocket,
  ) => {
    const { indexRoom } = JSON.parse(parsedMessage.data.toString());
    const roomToAdd = roomsDb.find((room) => room.roomId === indexRoom);
    const roomToAddIndex = roomsDb.findIndex((room) => room.roomId === indexRoom);
  
    const index = wsClient.id;
    const name = usersDb[index]?.name;
  
    if (
      roomToAdd &&
      name &&
      typeof indexRoom === "number" &&
      wsClient.id !== roomToAdd.roomUsers[0]?.index
    ) {
      roomToAdd.roomUsers.push({
        name,
        index,
      });
  
      handleCreateGame(roomToAddIndex);
  
      roomsDb.splice(roomToAddIndex, 1);
      sendAvailableRooms();
    }
  };