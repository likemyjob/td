import { Entity } from '../Abstract/Entity';
import { TransferInit } from '../Interface/TransferInit';
export declare class Wall extends Entity {
    width: number;
    height: number;
    constructor();
    setPosition(pos: any): void;
    setParams(data: TransferInit): void;
}
