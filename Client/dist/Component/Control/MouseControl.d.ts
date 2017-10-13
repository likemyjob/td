import { Player } from '../../Entity/Player';
import { Render } from '../../Render';
import { Network } from '../../Network';
export declare class MouseControl {
    constructor();
    render: Render;
    player: Player;
    network: Network;
    mouse: PIXI.Point;
    subscribers: any;
    listeners(): void;
    setMouse(event: MouseEvent): void;
    getPointInWorld(): PIXI.Point;
    next(point: PIXI.Point): void;
    subscribe(subscriber: any): void;
}
