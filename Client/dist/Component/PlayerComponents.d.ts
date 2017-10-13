import { MouseControl } from './Control/MouseControl';
import { State } from './State/State';
import { ControlComponent } from './Control/Control';
import { Network } from '../Network';
import { InventoryManager } from '../Manager/InventoryManager';
export declare class PlayerComponents {
    im: InventoryManager;
    keyboard: ControlComponent;
    mouseControl: MouseControl;
    network: Network;
    constructor();
    states: any;
    state: State;
    changeState(state: State): void;
    listeners(): void;
}
