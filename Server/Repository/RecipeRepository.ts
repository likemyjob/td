import {Repository} from '../Abstracts/Repository';

export class RecipeRepository extends Repository {

    //TODO can be attached to the user
    getRecipes(userId, callback = null) {
        let sql = 'SELECT * FROM recipe ';
        this.getQb(sql, [], callback);
    }
}
