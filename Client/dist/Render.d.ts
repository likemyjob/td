/// <reference path="helper/FPSMeter.d.ts" />
import { EntityManager } from './Manager/EntityManager';
export declare class Render {
    app: PIXI.Application;
    em: EntityManager;
    width: number;
    height: number;
    resources: any;
    world: PIXI.Container;
    constructor();
    onLoaded(loader: any, res: any): void;
    private focusToPoint();
    private resize();
    update(delta: number): void;
}
