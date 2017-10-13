import { State } from './State';
export declare class Idle extends State {
    move(input: number): void;
    shoot(point: PIXI.Point): void;
}
