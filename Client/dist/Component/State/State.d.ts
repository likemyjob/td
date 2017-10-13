import { PlayerComponents } from '../PlayerComponents';
export declare abstract class State {
    caller: any;
    playerComponents: PlayerComponents;
    constructor(playerComponents: PlayerComponents);
    build(point: PIXI.Point): void;
    move(input: number): void;
    shoot(point: PIXI.Point, state?: string): void;
}
