import { Network } from '../Network';
import { Recipe } from '../Helper/Recipe';
export declare class RecipesManager {
    network: Network;
    recipes: Recipe[];
    constructor();
    listener(): void;
    buildRecipeContainer(data: Recipe[]): void;
    processingItems(item: any): void;
}
