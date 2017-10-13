import {TransferInit} from '../Interface/TransferInit';
import {TransferHard} from '../Interface/TransferHard';

export class Entity {
    container: PIXI.Container;
    id: number;

    setPosition(pos: PIXI.Point) {
        this.container.position.set(pos.x, pos.y);
    }

    setParams(data: TransferInit) {
        this.setPosition(data.position);
    }

    update(data: TransferHard) {
        this.setPosition(data.position);
    }
}
