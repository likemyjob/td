import {EntityManager} from '../Manager/EntityManager';

let box2d = require('box2dweb/box2d.js');

export const SIZE = 20;

export class WorldB2 {
    id: number;
    public gravity: Box2D.Common.Math.b2Vec2 = new box2d.Common.Math.b2Vec2(0, 0);
    public world: Box2D.Dynamics.b2World     = new box2d.Dynamics.b2World(this.gravity, true);
    public timeStep: number                  = 1 / 60;
    public velocityIterations: number        = 10;
    public positionIterations: number        = 10;
    public hz                                = 60;

    public stop = false;

    em: EntityManager;

    constructor() {
        this.em = new EntityManager();
        this.em.setWorld(this);

        this.update();
        console.log('world created');
    }

    public update() {
        let that = this;
        setInterval(function () {
            if (!that.stop) {
                that.world.Step(that.timeStep, that.velocityIterations, that.positionIterations);
                that.world.ClearForces();
                // console.log(that.body.GetPosition());
                that.em.update();
            }
        }, 1000 / 60);
    }

}
