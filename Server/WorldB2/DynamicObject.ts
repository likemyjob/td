import {PhysicalObject} from './PhysicalObject';
import {EntityManager} from '../Manager/EntityManager';
import {Player} from '../Entity/Player';

let box2d = require('box2dweb/box2d.js');

export class DynamicObject extends PhysicalObject {
    constructor(dbObject, b2World) {
        super(dbObject, b2World);
        this.initBody();
    }

    em: EntityManager;

    initBody() {
        let b2Body = box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_dynamicBody);
    }

    setEm(em) {
        this.em = em;
    }

    update() {
        this.em.players.forEach((entity: Player) => {
            let tp        = this.getData();
            tp.entityType = this.dbObject.constructor.name;
            entity.socket.emit('transfer', tp);
        });
    }
}
