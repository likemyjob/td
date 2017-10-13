import {Player} from '../Entity/Player';
import {WorldB2} from '../WorldB2/WorldB2';
import {Entity} from '../Abstracts/Entity';
import {MysqlDb} from '../Db/MysqlDb';
import {Container} from 'typedi';
import {Barrel} from '../Entity/Barrel';
import {StaticObject} from '../WorldB2/StaticObject';
import {Wall} from '../Entity/Wall';
import {DynamicObject} from '../WorldB2/DynamicObject';
import {User} from '../Entity/User';

export class MockPlayerDb {
    radius: number = 15;
    position       = {x: 100, y: 100};
}

export class EntityManager {
    players: any = [];

    staticEntities: any  = [];
    dynamicEntities: any = [];

    worldB2: WorldB2;

    counterId: number = 0;

    tick: number = 0;

    constructor() {

    }

    createPlayer(socket) {
        let mockPlayerDb = (<any>Object).assign(new User(), new MockPlayerDb());
        let player       = new Player(mockPlayerDb, socket, this);
        this.counterId++;
        player.id = this.counterId;
        this.players.push(player);
    }

    addStaticEntity(entity: any) {
        this.counterId++;
        entity.id = this.counterId;
        this.staticEntities.push(entity);
    }

    addDynamicEntity(entity: any) {
        this.counterId++;
        entity.id = this.counterId;
        this.dynamicEntities.push(entity);
    }

    //TODO should be removed
    destroyPlayer(player) {
        this.players.forEach((entity: Player) => {
            entity.socket.emit('destroyEntity', player.getData());
        });
        this.worldB2.world.DestroyBody(player.body);
        this.players.splice(this.players.indexOf(player), 1);
    }

    destroyEntity(entity) {
        this.players.forEach((entity) => {
            // entity.socket.emit('destroyEntity', entity.getData());
            console.log(entity);
        });
        // this.worldB2.world.DestroyBody(entity.body);
        // this.dynamicEntities.splice(this.dynamicEntities.indexOf(entity), 1);
    }

    setWorld(world) {
        this.worldB2 = world;
        this.loadData();
    }

    update() {
        this.tick++;
        this.players.forEach((player: Player) => {
            if (player.ready) {
                player.update();
            }
        });

        this.dynamicEntities.forEach((entity: Entity) => {
            if (entity.body) {
                entity.update();
            }
        });

        //should be run by schedule object
        if (this.tick > 100) {
            this.tick = 0;
            this.schedule();
        }
    }

    staticObjects = [
        Wall,
    ];

    dynamicObjects = [
        Barrel,
    ];

    createStaticObject(obj) {
        obj.position = JSON.parse(obj.position);
        let entity   = new StaticObject(obj, this.worldB2);
        this.addStaticEntity(entity);
    }

    createDynamicObject(obj) {
        obj.position = JSON.parse(obj.position);
        let entity   = new DynamicObject(obj, this.worldB2);
        entity.setEm(this);
        this.addDynamicEntity(entity);
        return entity;
    }

    loadObjects(link, method) {
        let db = Container.get(MysqlDb);
        db.getObjects(link, (result) => {
            result.forEach((item) => {
                let entity = (<any>Object).assign(new link(), item);
                this[method](entity);
            })
        });
    }

    loadData() {
        this.staticObjects.forEach((link) => {
            this.loadObjects(link, 'createStaticObject');
        });
        this.dynamicObjects.forEach((link) => {
            this.loadObjects(link, 'createDynamicObject');
        });
    }

    getRepository(link) {
        return new link.repository();
    }

    //TODO should be allotted class
    schedule() {
        this.updatePositions();
    }

    updatePositions() {
        let db = Container.get(MysqlDb);
        this.players.forEach((entity) => {
            if (entity.dbObject.id) {
                entity.dbObject.position = entity.getPosition();
                db.updateObject(entity.dbObject);
            }

        });

        this.dynamicEntities.forEach((entity) => {
            if (entity.dbObject.id) {
                entity.dbObject.position = entity.getPosition();
                db.updateObject(entity.dbObject);
            }
        });
    }

    createNewObjects() {

    }

}
