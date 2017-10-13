import {Container, Service} from 'typedi';
import {Network} from '../Network';
import {Recipe} from '../Helper/Recipe';

@Service()
export class RecipesManager {

    network: Network = Container.get(Network);

    recipes: Recipe[] = [];

    constructor() {
        this.listener();
    }

    listener() {
        document.getElementById('showRecipes').addEventListener('click', (event) => {
            this.network.socket.emit('recipes');

            this.network.socket.on('recipes', (data: Recipe[]) => {
                this.buildRecipeContainer(data);
            });
        });
    }

    buildRecipeContainer(data: Recipe[]) {
        let ul = document.createElement('ul');
        data.forEach((recipe: Recipe) => {
            let li   = document.createElement('li');
            let text = document.createTextNode(recipe.name);
            li.appendChild(text);
            ul.appendChild(li);

            this.processingItems(li);

            let div   = document.getElementById('backpack');
            let oldUl = div.getElementsByTagName('ul')[0];
            if (oldUl) {
                div.replaceChild(ul, oldUl);
            } else {
                div.appendChild(ul);
            }
        });
    }

    processingItems(item: any) {
        this.recipes.push(item);
        item.addEventListener('mousedown', (event: MouseEvent) => {
            // item.style.position = 'absolute';
            item.style.background = 'red';
            // this.moveAt(item, event);
        });

        document.addEventListener('mouseup', (event: MouseEvent) => {
            item.style.background = 'none';
        });
    }
}
