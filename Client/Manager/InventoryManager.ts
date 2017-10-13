import {Network} from '../Network';
import {Inventory} from '../Helper/Inventory';
import {Ingredient} from '../Helper/Ingredient';
import {Container, Service} from 'typedi';
import {Barrel} from '../Entity/Barrel';
import {TransferInit} from '../Interface/TransferInit';
import {Render} from '../Render';
import {Player} from '../Entity/Player';

@Service()
export class InventoryManager {

    network: Network = Container.get(Network);
    player: Player   = Container.get(Player);

    render = Container.get(Render);

    constructor() {
        this.listener();
    }

    inventory: Inventory = new Inventory();

    newObj: any;
    currentItem: any;

    listener() {
        document.getElementById('showInventory').addEventListener('click', (event) => {
            this.network.socket.emit('inventory');

            this.network.socket.on('inventory', (data: Ingredient[]) => {
                this.inventory.ingredients = data;
                this.show(data);
            });

            event.preventDefault();
            return false;
        });
    }

    show(data: Ingredient[]) {
        let ul = document.createElement('ul');
        data.forEach((ing: Ingredient) => {
            let li   = document.createElement('li');
            let text = document.createTextNode(ing.name);
            li.appendChild(text);
            ul.appendChild(li);

            this.processingItems(li)
        });

        //TODO should be replaced by best solution
        let div   = document.getElementById('backpack');
        let oldUl = div.getElementsByTagName('ul')[0];
        if (oldUl) {
            div.replaceChild(ul, oldUl);
        } else {
            div.appendChild(ul);
        }
    }

    processingItems(item: any) {

        this.currentItem = item;

        //TODO make other objects
        this.currentItem.addEventListener('mousedown', (event: MouseEvent) => {
            this.currentItem.style.background = 'red';

            this.player.components.changeState(this.player.components.states.Build);

            this.newObj = new Barrel();

            let data: TransferInit = {
                entityId  : null,
                entityType: 'Barrel',
                radius    : 10,
                position  : this.player.getPosition(),
                width     : 10,
                height    : 10,
            };

            this.newObj.setParams(data);

            event.preventDefault();
        });

        // document.addEventListener('mouseup', (event: MouseEvent) => {
        //     item.style.background = 'none';
        //     this.tryCreateObjInWorld(barrel);
        //
        //     setTimeout(() => {
        //         if (barrel) {
        //             this.render.world.removeChild(barrel.container);
        //         }
        //     }, 5000);
        // });

        document.addEventListener('mousemove', (event: MouseEvent) => {
            if (!this.newObj) {
                return;
            }

            let worldPos     = this.render.world.getGlobalPosition();
            let pointInWorld = new PIXI.Point(event.clientX - worldPos.x, event.clientY - worldPos.y);

            this.newObj.setPosition(pointInWorld);
        });
    }

    tryCreateObjInWorld() {
        this.currentItem.style.background = 'none';
        this.render.world.removeChild(this.newObj.container);
        // this.network.socket.emit('buildObj', this.newObj);
    }

}
