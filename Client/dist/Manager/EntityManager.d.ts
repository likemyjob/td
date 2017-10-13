import { TransferHard } from '../Interface/TransferHard';
import { TransferInit } from '../Interface/TransferInit';
export declare class EntityManager {
    entities: any;
    addEntity(entity: any): void;
    types: any;
    update(data: TransferHard): void;
    createEntity(data: TransferInit): void;
    destroyEntity(data: TransferHard): void;
}
