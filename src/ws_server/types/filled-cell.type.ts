import { IPosition } from "./position.type";
import { IShipTypes } from "./ship-types.type";

export interface IFilledCell {
    type: IShipTypes;
    length: number;
    position: IPosition;
    shots: IPosition[];
    missesAround: IPosition[];
    status: string;
  }