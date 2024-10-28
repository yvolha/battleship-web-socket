const createWsIdFunc = () => {
    let count = 0;
    return () => count++;
  };
  
  export const createWsId = createWsIdFunc();
  
  const createGameRoomIdFunc = () => {
    let count = 0;
    return () => count++;
  };
  
  export const createGameRoomId = createGameRoomIdFunc();
  
  const createGameIdFunc = () => {
    let count = 0;
    return () => count++;
  };
  
  export const createGameId = createGameIdFunc();