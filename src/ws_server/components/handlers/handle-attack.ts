import { wss } from "../../../index.js";
import { WS_MESSAGE_TYPES } from "../../constants/message-types.js";
import { boardsDb } from "../../database/database.js";
import { IBoard } from "../../database/database.type.js";
import { getRandomInteger } from "../../utils/get-integer-in-range.js";
import { IParsedMessage } from "../handle-message.type.js";

export const handleAttack = (parsedMessage: IParsedMessage) => {
    let { x, y, gameId, indexPlayer } = JSON.parse(parsedMessage.data.toString());

    if (!x || !y) {
        x =  getRandomInteger(0, 10).toString();
        y =  getRandomInteger(0, 10).toString();
    }
  
    const playerBoards = boardsDb.filter((e) => e.gameId === gameId);
    const wsClientsIds = playerBoards.map((e) => e.userId);
    const indexEnemyPlayer = wsClientsIds.find(id => id !== indexPlayer);
    const enemyBoard = playerBoards.find(board => board.userId === indexEnemyPlayer);

    const isEnemyShot = getIsEnemyShot(x, y, enemyBoard as IBoard);

  
    wss.clients.forEach((client) => {
        if (client.id === wsClientsIds[0] || client.id === wsClientsIds[1]) {
            if (isEnemyShot) {
                client.send(
                    JSON.stringify({
                      type: WS_MESSAGE_TYPES.attack,
                      data: JSON.stringify({
                        position: {
                            x,
                            y,
                        },
                        currentPlayer: indexPlayer,
                        status: "shot",
                      }),
                      id: 0,
                    })
                  );
            } else {
                client.send(
                    JSON.stringify({
                      type: WS_MESSAGE_TYPES.attack,
                      data: JSON.stringify({
                        position: {
                            x,
                            y,
                        },
                        currentPlayer: indexPlayer,
                        status: "miss",
                      }),
                      id: 0,
                    })
                  );
            }

            client.send(
                JSON.stringify({
                  type: WS_MESSAGE_TYPES.turn,
                  data: JSON.stringify({
                    currentPlayer: isEnemyShot ? indexPlayer : indexEnemyPlayer,
                  }),
                  id: 0,
                })
              );
        }
    });
  };

  function getIsEnemyShot (x:number, y: number, enemyBoard: IBoard): boolean {
    let isShot = false;

    enemyBoard.board.forEach(elOuter => {
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

                    return isShot;
                }
            } else {
                const yInRange = elInner.position.y;
                const xInRangeMin = elInner.position.x;
                const xInRangeMax = elInner.position.x + elInner.length - 1;

                if (y === yInRange && x >= xInRangeMin && x <= xInRangeMax){
                    isShot = true;

                    return isShot;
                }
            }
        })
    })

    return isShot;
}