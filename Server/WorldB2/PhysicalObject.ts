import {SIZE} from './WorldB2';
import {TransferInit} from '../../Client/Interface/TransferInit';

let box2d = require('box2dweb/box2d.js');

export class PhysicalObject {
    dbObject: any;
    body: Box2D.Dynamics.b2Body = null;

    world: any;

    id: number;

    constructor(dbObject, worldB2) {
        this.dbObject = dbObject;
        this.world    = worldB2.world;
    }

    public createBody(type: any) {
        let b2BodyDef      = box2d.Dynamics.b2BodyDef,
            b2FixtureDef   = box2d.Dynamics.b2FixtureDef,
            b2CircleShape  = box2d.Collision.Shapes.b2CircleShape,
            b2PolygonShape = box2d.Collision.Shapes.b2PolygonShape;

        let bodyDef: any = new b2BodyDef();
        bodyDef.type     = type;

        bodyDef.position.Set(this.dbObject.position.x / SIZE, this.dbObject.position.y / SIZE);
        bodyDef.linearDamping  = 0.5;
        bodyDef.angularDamping = 0.1;

        this.body = this.world.CreateBody(bodyDef);

        let shape: any;
        if (this.dbObject.radius) {
            shape = new b2CircleShape(this.dbObject.radius / SIZE);
        }
        else {
            shape = new b2PolygonShape;
            shape.SetAsBox(this.dbObject.width / 2 / SIZE, this.dbObject.height / 2 / SIZE);
        }

        let fd: any    = new b2FixtureDef();
        fd.shape       = shape;
        fd.density     = 1;
        fd.restitution = 0.1;
        fd.friction    = 0.1;

        this.body.CreateFixture(fd);
    }

    getPosition() {
        let position = this.body.GetPosition().Copy();
        position.Multiply(SIZE);
        return position;
    }

    getData() {
        let tp      = new TransferInit();
        tp.entityId = this.id;
        tp.position = this.getPosition();

        if (this.dbObject.radius) {
            tp.radius = this.dbObject.radius;
        } else {
            tp.width  = this.dbObject.width;
            tp.height = this.dbObject.height;
        }

        tp.entityType = this.dbObject.constructor.name;
        return tp;
    }

    initBody() {
        let b2Body = box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_staticBody);
    }

    setPosition(x: number, y: number) {
        x *= 1 / 20;
        y *= 1 / 20;
        this.body.SetPosition(new box2d.Common.Math.b2Vec2(x, y));
    }
}
