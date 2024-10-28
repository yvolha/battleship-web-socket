import { CustomWebSocket, wss } from "../../index.js";
import { roomsDb } from "../database/database.js";

export const getWsClientIdsInRoom = (roomId: number) => {
    const gameRoom = roomsDb.find((room) => room.roomId === roomId);
  
    const [wsClientId_1, wsClientId_2] = gameRoom
      ? gameRoom.roomUsers.map((user) => user.index)
      : [-1, -1];
  
    const wsClientsInRoom: Array<CustomWebSocket> = [];
  
    wss.clients.forEach((client) => {
      if (client.id === wsClientId_1 || client.id === wsClientId_2) {
        wsClientsInRoom.push(client);
      }
    });
  
    return wsClientsInRoom;
  };