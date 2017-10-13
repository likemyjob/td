import {State} from './State';
export class Shoot extends State {
    shoot(point: PIXI.Point, state: string = 'Idle') {
        this.playerComponents.network.socket.emit('touche', point);
        this.playerComponents.changeState(this.playerComponents.states[state]);
    }
}
