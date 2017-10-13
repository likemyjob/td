import { TransferInit } from '../Interface/TransferInit';
import { TransferHard } from '../Interface/TransferHard';
export declare class Entity {
    container: PIXI.Container;
    id: number;
    setPosition(pos: PIXI.Point): void;
    setParams(data: TransferInit): void;
    update(data: TransferHard): void;
}
