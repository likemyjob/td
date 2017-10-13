import { Network } from '../Network';
import { Inventory } from '../Helper/Inventory';
import { Ingredient } from '../Helper/Ingredient';
import { Render } from '../Render';
import { Player } from '../Entity/Player';
export declare class InventoryManager {
    network: Network;
    player: Player;
    render: Render;
    constructor();
    inventory: Inventory;
    newObj: any;
    currentItem: any;
    listener(): void;
    show(data: Ingredient[]): void;
    processingItems(item: any): void;
    tryCreateObjInWorld(): void;
}
