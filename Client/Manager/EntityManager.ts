import {Container, Service} from 'typedi';
import {TransferHard} from '../Interface/TransferHard';
import {Player} from '../Entity/Player';
import {TransferInit} from '../Interface/TransferInit';
import {Wall} from '../Entity/Wall';
import {Entity} from '../Abstract/Entity';
import {EnemyPlayer} from '../Entity/EnemyPlayer';
import {Render} from '../Render';
import {Barrel} from '../Entity/Barrel';
import {Bullet} from "../Entity/Bullet";

@Service()
export class EntityManager {

    entities: any = [];

    addEntity(entity: any) {
        this.entities.push(entity);
    }

    types: any = {
        'Player'     : Player,
        'EnemyPlayer': EnemyPlayer,
        'Wall'       : Wall,
        'Barrel'     : Barrel,
        'Bullet'     : Bullet,
    };

    update(data: TransferHard) {
        this.entities.forEach((entity: Entity) => {
            if (entity.id === data.entityId) {
                entity.update(data);
            }
        });
    }

    createEntity(data: TransferInit) {
        if (!this.types[data.entityType]) {
            console.log('You need create view from the ' + data.entityType);
            return;
        }

        let entity: Entity = new this.types[data.entityType]();
        entity.setParams(data);
        this.addEntity(entity);
    }

    destroyEntity(data: TransferHard) {
        let entity = this.entities.find((e: Entity) => (data.entityId === e.id));
        let render = Container.get(Render);
        render.world.removeChild(entity.container);
        let index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
    }

}
