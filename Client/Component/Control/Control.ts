import {Service} from 'typedi';
import {Keys} from './Keys';

@Service()
export class ControlComponent {

    constructor() {
        this.eventsListener();
    }

    input: number;

    private pressed: any = [];

    private callbacks: any = [];

    public keys: any = new Keys();

    public move: boolean = false;

    public groups = {
        move : ['left', 'up', 'right', 'down'],
        // build: [''],
        shoot: ['shoot'],
    };

    checkMove() {
        this.move = false;
        let key: string;
        for (key in this.groups.move) {
            if (this.keys[this.groups.move[key]].checked) {
                this.move = true;
                break;
            }
        }
    }

    subscribe(func: any) {
        this.callbacks.push(func);
    }

    execute() {
        this.checkMove();
        this.callbacks.forEach((func: any) => {
            if (typeof func === 'function') {
                func(this.input);
            }
        });
    }

    protected eventsListener() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            this.keyDown(e);
            this.encodeBitmask();
        }, false);
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            this.keyUp(e);
            this.encodeBitmask();
        }, false);
    }

    private keyDown(e: KeyboardEvent) {
        let key: string;
        for (key in this.keys) {
            if (this.keys[key].codes.indexOf(e.keyCode) != -1) {
                if (this.pressed.indexOf(e.keyCode) == -1) {
                    this.keys[key].checked = true;
                    this.pressed.push(e.keyCode);
                }
                break;
            }
        }
    }

    private keyUp(e: KeyboardEvent) {
        let key: string;
        for (key in this.keys) {
            if (this.keys[key].codes.indexOf(e.keyCode) != -1) {
                let index = this.pressed.indexOf(e.keyCode);
                if (index >= 0) {
                    this.keys[key].checked = false;
                    this.pressed.splice(index, 1);
                }
                break;
            }
        }
    }

    encodeBitmask(): void {
        this.input = 0;
        let key: string;
        for (key in this.keys) {
            if (this.keys[key].checked) {
                this.input |= this.keys[key].value;
            }
        }
        this.execute();
    }

    decodeBitmask(inputBitmask: number) {
        let key: string;
        for (key in this.keys) {
            this.keys[key].checked = !!(inputBitmask & this.keys[key].value);
        }
    }

}
