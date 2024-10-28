import { IPosition } from "./position.type";
import { IShipTypes } from "./ship-types.type";

export interface IShip {
    position: IPosition;
    direction: boolean;
    length: number;
    type: IShipTypes;
  }