import {Keys} from '../../Client/Component/Control/Keys';
import {EntityManager} from '../Manager/EntityManager';
import {MysqlDb} from '../Db/MysqlDb';
import {Container} from 'typedi';
import {AuthInt} from '../../Client/Interface/AuthInt';
import {DynamicObject} from '../WorldB2/DynamicObject';
import {EnemyPlayer} from './EnemyPlayer';
import {PlayerRepository} from '../Repository/PlayerRepository';
import {Inventory} from './Inventory';
import {Point} from '../Interface/Point';
import {Bullet} from './Bullet';
import {Recipe} from './Recipe';

let box2d = require('box2dweb/box2d.js');

export class MockBulletDb {
    radius: number = 5;
    position: any  = {x: 0, y: 0};
}

export class Player extends DynamicObject {
    static repository     = PlayerRepository;
           socket: any;
           ready: boolean = false;
           keys           = new Keys();
           em: EntityManager;
           username: string;

    constructor(dbObject, socket: any, em) {
        super(dbObject, em.worldB2);
        this.em = em;
        console.log('player ' + socket.id + ' connected');
        this.socket = socket;

        let key: string;
        for (key in this.keys) {
            if (this.keys[key].vector) {
                this.keys[key].vector = new box2d.Common.Math.b2Vec2(this.keys[key].vector.x, this.keys[key].vector.y);
                // this.keys[key].vector.Multiply(0.5);
            }
        }

        this.listeners();
    }

    listeners() {
        this.socket.on('readyListen', (data: AuthInt) => {
            console.log(data);
            let mysqlDb = Container.get(MysqlDb);
            mysqlDb.getUsersFromEmail(data.email, (res) => {

                if (!res.length) {
                    this.socket.emit('GError', {mess: 'Player not found!'});
                    return;
                }

                this.ready = data.ready;

                this.dbObject = (<any>Object).assign(this.dbObject, res[0]);
                this.username = this.dbObject.username;
                let position  = JSON.parse(this.dbObject.position);
                this.setPosition(position.x, position.y);

                this.socket.emit('initPlayer', this.getData());

                let transfer        = this.getData();
                transfer.entityType = 'EnemyPlayer';
                transfer.entityId   = this.id;
                //Отсылаю себя всем
                this.socket.broadcast.emit('initEntity', transfer);

                this.em.staticEntities.forEach((entity: any) => {
                    this.socket.emit('initEntity', entity.getData());
                });

                this.em.dynamicEntities.forEach((entity: any) => {
                    this.socket.emit('initEntity', entity.getData());
                });

                //Отсылаю себе всех кроме себя или получаю всех остальных
                this.em.players.forEach((player: Player) => {
                    if (player != this) {
                        let data        = player.getData();
                        data.entityType = 'EnemyPlayer';
                        data.entityId   = player.id;
                        this.socket.emit('initEntity', data);
                    }
                });

            });

        });

        this.socket.on('Input', (input: number) => {
            // console.log('playerID:' + this.id + ' input:' + input);
            this.decodeBitmask(input);
        });

        this.socket.on('inventory', () => {
            let inventoryRep = this.em.getRepository(Inventory);
            inventoryRep.getInventory(this.dbObject.id, (inventory) => {
                this.socket.emit('inventory', inventory);
            });
        });

        this.socket.on('recipes', () => {
            let recipesRep = this.em.getRepository(Recipe);
            recipesRep.getRecipes(this.dbObject.id, (recipes) => {
                this.socket.emit('recipes', recipes);
            });
        });

        this.socket.on('touche', (pos: Point) => {
            this.createShot(pos);
        });
    }

    createShot(pos: Point) {
        let currentPos = this.getPosition();
        let v          = new box2d.Common.Math.b2Vec2(pos.x - currentPos.x, pos.y - currentPos.y);
        let l          = v.Length();

        let first = new box2d.Common.Math.b2Vec2(v.x / l, v.y / l);
        let s     = first.Copy();
        s.Multiply(50);

        let mock        = new MockBulletDb();
        mock.position.x = currentPos.x + first.x * 25;
        mock.position.y = currentPos.y + first.y * 25;

        mock.position = JSON.stringify(mock.position);

        let bullet = (<any>Object).assign(new Bullet(), mock);

        bullet = this.em.createDynamicObject(bullet);
        bullet.body.ApplyImpulse(s, bullet.body.GetWorldCenter());

        //need inject timeout destroy bullet

        this.socket.emit('initEntity', bullet.getData());
    }

    decodeBitmask(inputBitmask: number) {
        let key: string;
        for (key in this.keys) {
            this.keys[key].checked = !!(inputBitmask & this.keys[key].value);
        }
    }

    tick: number = 0;

    update() {
        if (!this.body) {
            return;
        }

        this.tick++;

        if (this.tick > 1) {
            this.socket.emit('transfer', this.getData());
            this.socket.broadcast.emit('transfer', this.getData());
            this.tick = 0;
        }

        Keys.move.forEach((key:string)=>{
            if (this.keys[key].checked) {
                this.body.ApplyImpulse(this.keys[key].vector, this.body.GetWorldCenter());
            }
        });
    }

    getData() {
        return super.getData();
    }
}
