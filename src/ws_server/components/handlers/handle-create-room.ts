import { CustomWebSocket } from "../../../index.js";
import { roomsDb, usersDb } from "../../database/database.js";
import { createGameRoomId } from "../../utils/create-id.js";
import { getRoomCreatedMessage } from "../../utils/get-success-messages.js";
import { sendAvailableRooms } from "./update-rooms.js";

export const handleCreateRoom = (wsClient: CustomWebSocket) => {
    const index = wsClient.id;
    const name = usersDb[index].name;
  
    const roomByThisUserIndex = roomsDb.findIndex((room) =>
      room.roomUsers.some((user) => user.index === wsClient.id)
    );
  
    if (name && roomByThisUserIndex === -1) {
      const roomId = createGameRoomId();
  
      roomsDb.push({
        roomId: roomId,
        roomUsers: [
          {
            name,
            index,
          },
        ],
      });
  
      console.log(getRoomCreatedMessage(roomId, name));
    }
  
    sendAvailableRooms();
  };