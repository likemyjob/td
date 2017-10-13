import {Container, Service} from 'typedi';
import {Player} from '../../Entity/Player';
import {Render} from '../../Render';
import {Network} from '../../Network';

@Service()
export class MouseControl {
    constructor() {
        this.render = Container.get(Render);
        this.player = Container.get(Player);
        this.listeners();
    }

    render: Render;
    player: Player;
    network: Network;
    mouse            = new PIXI.Point();
    subscribers: any = [];

    listeners() {
        document.addEventListener('mousemove', (event: MouseEvent) => {
            this.setMouse(event);
            //TODO rotate player to mouse
        });

        document.getElementById('wrapper').addEventListener('click', (event: MouseEvent) => {
            this.setMouse(event);
            this.next(this.getPointInWorld());
        });
    }

    setMouse(event: MouseEvent) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    getPointInWorld() {
        let worldPos = this.render.world.getGlobalPosition();
        return new PIXI.Point(this.mouse.x - worldPos.x, this.mouse.y - worldPos.y);
    }

    next(point: PIXI.Point) {
        this.subscribers.forEach((subscriber: any) => {
            subscriber(point);
        });
    }

    subscribe(subscriber: any) {
        this.subscribers.push(subscriber);
    }
}
