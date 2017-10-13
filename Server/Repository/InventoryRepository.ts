import {Repository} from '../Abstracts/Repository';

export class InventoryRepository extends Repository {
    getInventory(userId, callback = null) {
        let sql = 'SELECT * FROM inventory ' +
            'JOIN ingredient ON ingredient.id = inventory.ingredient_id' +
            ' WHERE user_id = ' + userId;
        this.getQb(sql, [], callback);
    }
}
