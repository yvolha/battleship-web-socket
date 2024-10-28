import { IBoard, IRoom, IUsersDb, IWinnersDb } from "./database.type";

export const usersDb: IUsersDb = {};

export const regUserInDb = async (id: number, name: string, password: string) => {
  usersDb[id] = {
    name,
    password,
  };
};

export const winnersDb: IWinnersDb = [];

export const roomsDb: Array<IRoom> = [];

export const boardsDb: IBoard[] = [];