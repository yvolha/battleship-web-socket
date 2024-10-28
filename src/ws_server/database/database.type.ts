import { IFilledCell } from "../types/filled-cell.type";
import { IShip } from "../types/ship.type";

export interface IUser {
    name: string;
    password: string;
}
  
export type IUsersDb = Record<number, IUser>;

export type IWinnersDb = Array<{
    name: string;
    wins: number;
}>;
  

export interface IBoard {
    userId: number;
    gameId: number;
    board: number[][] | IFilledCell[][];
    ships: IShip[];
  }

  export interface IRoom {
    roomId: number;
    roomUsers: Array<{
      name: string;
      index: number;
    }>;
  }