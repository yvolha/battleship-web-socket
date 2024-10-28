import { wss } from "../../../index.js";
import { WS_MESSAGE_TYPES } from "../../constants/message-types.js";
import { boardsDb } from "../../database/database.js";
import { IBoard } from "../../database/database.type.js";
import { IParsedMessage } from "../handle-message.type.js";

export const handleAttack = (parsedMessage: IParsedMessage) => {
    const { x, y, gameId, indexPlayer } = JSON.parse(parsedMessage.data.toString());
  
    const playerBoards = boardsDb.filter((e) => e.gameId === gameId);
    const wsClientsIds = playerBoards.map((e) => e.userId);
    const indexEnemyPlayer = wsClientsIds.find(id => id !== indexPlayer);
    const enemyBoard = playerBoards.find(board => board.userId === indexEnemyPlayer);
    console.log('indexEnemyPlayer:', indexEnemyPlayer,'\n', 'indexPlayer:',indexPlayer);

    const isEnemyShot = false;

  
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

  function getIsEnemyShot (x:number, y: number, enemyBoard: IBoard){
    let isShot = false;
    enemyBoard!.board.forEach(elOuter => {
        elOuter.forEach(elInner => {
            if (typeof elInner === 'number') {
                return;
            }

            if (elInner.direction) {
                const xInRange = elInner.position.x;
                const yInRangeMin = elInner.position.y;
                const yInRangeMax = elInner.position.y + elInner.length - 1;

                if (x === xInRange && y >= yInRangeMin && y <= yInRangeMax){
                    isShot = true;
                }
            } else {
                const yInRange = elInner.position.y;
                const xInRangeMin = elInner.position.x;
                const xInRangeMax = elInner.position.x + elInner.length - 1;

                if (y === yInRange && x >= xInRangeMin && x <= xInRangeMax){
                    isShot = true;
                }
            }
        })
        
    })

    return isShot;
}