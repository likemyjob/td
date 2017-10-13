import { Entity } from '../Abstract/Entity';
import { TransferHard } from '../Interface/TransferHard';
import { TransferInit } from '../Interface/TransferInit';
export declare class EnemyPlayer extends Entity {
    constructor();
    update(data: TransferHard): void;
    setParams(data: TransferInit): void;
}
