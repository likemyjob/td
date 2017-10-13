import {InventoryRepository} from '../Repository/InventoryRepository';

export class Inventory {
    static repository = InventoryRepository;
           id: number;
           user_id: number;
           ingredient_id: number;
           count: number;
}
