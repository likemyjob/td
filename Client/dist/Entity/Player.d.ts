import { Entity } from '../Abstract/Entity';
import { TransferHard } from '../Interface/TransferHard';
import { TransferInit } from '../Interface/TransferInit';
import { PlayerComponents } from '../Component/PlayerComponents';
export declare class Player extends Entity {
    id: number;
    components: PlayerComponents;
    container: any;
    constructor();
    display(): void;
    setPosition(pos: any): void;
    getPosition(): any;
    update(data: TransferHard): void;
    setParams(data: TransferInit): void;
}
