import { CustomWebSocket } from "../../../index.js";
import { handleAddUserToRoom } from "./handle-add-user-to-room.js";
import { handleCreateRoom } from "./handle-create-room.js";

export function handleSinglePlay (wsClient: CustomWebSocket) {
    const roomId = handleCreateRoom(wsClient);
    
}