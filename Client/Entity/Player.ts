import {Container, Inject, Service} from 'typedi';
import {Render} from '../Render';
import {Entity} from '../Abstract/Entity';
import {TransferHard} from '../Interface/TransferHard';
import {TransferInit} from '../Interface/TransferInit';
import {PlayerComponents} from '../Component/PlayerComponents';

@Service()
export class Player extends Entity {
    id: number;
    @Inject()
    components: PlayerComponents;

    container: any;

    constructor() {
        super();
        this.container = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.lineStyle(1, 0x000080, 1);
        gr.beginFill(0x1E90FF, 1);
        gr.drawCircle(0, 0, 10);
        gr.endFill();

        let gr2 = new PIXI.Graphics();
        gr2.beginFill(0x000000);
        gr2.lineStyle(2, 0x000000, 1);

        gr2.moveTo(0, 0);
        gr2.lineTo(0, -10);
        gr2.endFill();

        this.container.addChild(gr);
        this.container.addChild(gr2);


    }

    display() {
        let render = Container.get(Render);
        render.world.addChild(this.container);
    }

    setPosition(pos: any) {
        this.container.position.x = Math.round(pos.x);
        this.container.position.y = Math.round(pos.y);
    }

    getPosition() {
        return this.container.position;
    }

    update(data: TransferHard) {
        this.setPosition(data.position);
    }

    setParams(data: TransferInit) {
        super.setParams(data);
        let obj: any                        = this.container.getChildAt(0);
        obj.radius                          = data.radius;
        obj.width                           = data.radius * 2;
        obj.height                          = data.radius * 2;
        this.id                             = data.entityId;
        this.container.getChildAt(1).height = data.radius;
    }
}
