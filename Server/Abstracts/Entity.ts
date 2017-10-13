import {SIZE, WorldB2} from '../WorldB2/WorldB2';
import {EntityManager} from '../Manager/EntityManager';
import {ENTITY_TYPES, TransferInit} from '../../Client/Interface/TransferInit';

let box2d = require('box2dweb/box2d.js');

export abstract class Entity {
    id: number;
    em: EntityManager;
    body: Box2D.Dynamics.b2Body;
    world: any;
    radius: number = 10;
    width: number  = 1000;
    height: number = 20;
    type: any      = ENTITY_TYPES.box;

    position: any = new box2d.Common.Math.b2Vec2(0, 0);

    public createBody(type: any, form: string) {
        let b2BodyDef      = box2d.Dynamics.b2BodyDef,
            b2FixtureDef   = box2d.Dynamics.b2FixtureDef,
            b2CircleShape  = box2d.Collision.Shapes.b2CircleShape,
            b2PolygonShape = box2d.Collision.Shapes.b2PolygonShape;

        let bodyDef: any = new b2BodyDef();
        bodyDef.type     = type;

        bodyDef.position.Set(this.position.x / SIZE, this.position.y / SIZE);
        bodyDef.linearDamping  = 0.5;
        bodyDef.angularDamping = 0.1;

        this.body = this.world.CreateBody(bodyDef);

        let shape: any;
        switch (form) {
            case 'circle':
                shape = new b2CircleShape(this.radius / SIZE);
                break;
            default :
                shape = new b2PolygonShape;
                shape.SetAsBox(this.width / 2 / SIZE, this.height / 2 / SIZE);
                break;
        }

        let fd: any    = new b2FixtureDef();
        fd.shape       = shape;
        fd.density     = 1;
        fd.restitution = 0.1;
        fd.friction    = 0.1;

        this.body.CreateFixture(fd);
    }

    setWorld(worldB2: WorldB2) {
        this.world = worldB2.world;
    }

    setEntityManager(em: EntityManager) {
        this.em = em;
        this.setWorld(this.em.worldB2);
        this.initBody();
    }

    initBody() {
    }

    update() {
    }

    getPosition() {
        let position = this.body.GetPosition().Copy();
        position.Multiply(SIZE);
        return position;
    }

    setPosition(x: number, y: number) {
        x *= 1 / 20;
        y *= 1 / 20;
        this.body.SetPosition(new box2d.Common.Math.b2Vec2(x, y));
    }

    getData() {
        let tp        = new TransferInit();
        tp.entityId   = this.id;
        tp.position   = this.getPosition();
        tp.width      = this.width;
        tp.height     = this.height;
        tp.radius     = this.radius;
        tp.entityType = this.type;
        return tp;
    }
}
