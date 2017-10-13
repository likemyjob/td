import {MouseControl} from './Control/MouseControl';
import {Container, Inject, Service} from 'typedi';
import {State} from './State/State';
import {Idle} from './State/Idle';
import {ControlComponent} from './Control/Control';
import {Network} from '../Network';
import {Move} from './State/Move';
import {Shoot} from './State/Shoot';
import {Build} from './State/Build';
import {InventoryManager} from '../Manager/InventoryManager';

@Service()
export class PlayerComponents {
    @Inject()
    im: InventoryManager;
    //
    // @Inject()
    // recipes: RecipesManager;
    //
    @Inject()
    keyboard: ControlComponent;

    @Inject()
    mouseControl: MouseControl;

    network = Container.get(Network);

    constructor() {

        this.changeState(new Idle(this));

        // run asynchronously
        setTimeout(() => {
            this.listeners();
        });
    }

    states: any = {
        'Idle' : new Idle(this),
        'Move' : new Move(this),
        'Shoot': new Shoot(this),
        'Build': new Build(this),
    };

    state: State;

    changeState(state: State) {
        this.state = state;
        console.log(this.state.constructor.name);
    }

    listeners() {
        this.keyboard.subscribe((input: number) => {
            if (this.keyboard.keys.shoot.checked) {
                this.state.shoot(this.mouseControl.getPointInWorld());
            }

            this.state.move(input);

        });
        this.mouseControl.subscribe((point: PIXI.Point) => {
            this.state.shoot(point);
        });
    };
}
