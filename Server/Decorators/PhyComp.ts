import {WorldB2} from '../WorldB2/WorldB2';
import {Entity} from '../Abstracts/Entity';
let box2d = require('box2dweb/box2d.js');

export const PhyComp = () => (target: typeof Entity) => {
    class PhyComp extends target {
        body: any;
        world: any;
        radius: number = 10;
        width: number = 1000;
        heidht: number = 20;

        position: any = new box2d.Common.Math.b2Vec2(0, 0);

        protected createBody(type: any, form: string) {
            let b2BodyDef = box2d.Dynamics.b2BodyDef,
                b2FixtureDef = box2d.Dynamics.b2FixtureDef,
                b2CircleShape = box2d.Collision.Shapes.b2CircleShape,
                b2PolygonShape = box2d.Collision.Shapes.b2PolygonShape;

            let bodyDef: any = new b2BodyDef();
            bodyDef.type = type;
            bodyDef.position.Set(this.position.x / 20, this.position.y / 20);
            bodyDef.linearDamping = 0.5;
            bodyDef.angularDamping = 0.1;

            this.body = this.world.CreateBody(bodyDef);

            let shape: any;
            switch (form) {
                case 'circle':
                    shape = new b2CircleShape(20 / 20);
                    break;
                default :
                    shape = new b2PolygonShape;
                    shape.SetAsBox(this.width / 2 / 20, this.heidht / 2 / 20);
                    break;
            }

            let fd: any = new b2FixtureDef();
            fd.shape = shape;
            fd.density = 1;
            fd.restitution = 1;
            fd.friction = 0.1;

            this.body.CreateFixture(fd);

            let i = new box2d.Common.Math.b2Vec2(1000, -100);
            this.body.ApplyImpulse(i, this.body.GetWorldCenter());
        }

        setWorld(worldB2: WorldB2) {
            this.world = worldB2.world;
        }
    }
    return PhyComp;
};
