import {State} from './State';

export class Build extends State {
    shoot(point: PIXI.Point, state: string = 'Idle') {
        this.playerComponents.im.tryCreateObjInWorld();
        this.playerComponents.changeState(this.playerComponents.states[state]);
    }
}
