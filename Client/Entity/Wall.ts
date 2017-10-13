import {Entity} from '../Abstract/Entity';
import {Container} from 'typedi';
import {Render} from '../Render';
import {TransferInit} from '../Interface/TransferInit';

export class Wall extends Entity {
    width: number  = 100;
    height: number = 100;

    constructor() {
        super();
        let render     = Container.get(Render);
        this.container = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.beginFill(0x000000);
        gr.lineStyle(2, 0x000000, 1);
        gr.drawRect(0, 0, this.width * 2, this.height);
        gr.endFill();

        this.container.addChild(gr);
        render.world.addChild(this.container);
    }

    setPosition(pos: any) {
        this.container.position.x = pos.x - this.container.width / 2;
        this.container.position.y = pos.y - this.container.height / 2;
    }

    setParams(data: TransferInit) {
        super.setParams(data);
        let obj: any = this.container.getChildAt(0);
        obj.radius   = data.radius;
        obj.width    = data.width;
        obj.height   = data.height;
        this.id      = data.entityId;
        this.setPosition(data.position);
    }
}
