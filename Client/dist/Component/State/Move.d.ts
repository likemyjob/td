import { State } from './State';
export declare class Move extends State {
    timer: any;
    move(input: number): void;
    shoot(point: PIXI.Point): void;
}
