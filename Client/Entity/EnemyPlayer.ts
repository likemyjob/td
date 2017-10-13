import {Entity} from '../Abstract/Entity';
import {Container} from 'typedi';
import {Render} from '../Render';
import {TransferHard} from '../Interface/TransferHard';
import {TransferInit} from '../Interface/TransferInit';

export class EnemyPlayer extends Entity {
    constructor() {
        super();
        let render     = Container.get(Render);
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

        setTimeout(() => {
            render.world.addChild(this.container);
        }, 1000);
    }

    update(data: TransferHard) {
        this.setPosition(data.position);
    }

    setParams(data: TransferInit) {
        let obj: any = this.container.getChildAt(0);
        this.id      = data.entityId;
        obj.width    = data.radius * 2;
        obj.height   = data.radius * 2;
        this.setPosition(data.position);
    }
}
