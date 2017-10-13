import {TransferInit} from '../Interface/TransferInit';
import {Entity} from '../Abstract/Entity';
import {Render} from '../Render';
import {Container} from 'typedi';
import {TransferHard} from '../Interface/TransferHard';

export class Barrel  extends Entity {

    constructor(){
        super();
        this.container = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.lineStyle(1, 0x000080, 1);
        gr.beginFill(0x1E90FF, 1);
        gr.drawCircle(0, 0, 10);
        gr.endFill();
        this.container.addChild(gr);
        let render     = Container.get(Render);
        render.world.addChild(this.container);
    }

    setParams(data: TransferInit) {
        super.setParams(data);
        let obj: any = this.container.getChildAt(0);
        obj.radius   = data.radius;
        obj.width    = data.radius * 2;
        obj.height   = data.radius * 2;
        this.id      = data.entityId;
    }
}
