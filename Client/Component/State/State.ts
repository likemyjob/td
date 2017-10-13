import {PlayerComponents} from '../PlayerComponents';

export abstract class State {

    caller:any;

    playerComponents: PlayerComponents;

    constructor(playerComponents: PlayerComponents) {
        this.playerComponents = playerComponents;
    }

    build(point: PIXI.Point) {

    }

    move(input: number) {

    }

    shoot(point: PIXI.Point, state: string = 'Idle') {

    }
}
