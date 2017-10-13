import {State} from './State';

export class Move extends State {

    timer: any;

    move(input: number) {
        clearTimeout(this.timer);
        this.playerComponents.network.socket.emit('Input', input);
        this.timer = setTimeout(() => {
            this.playerComponents.changeState(this.playerComponents.states.Idle);
        }, 500);
    }

    shoot(point: PIXI.Point) {
        this.playerComponents.network.socket.emit('Input', 0);
        this.playerComponents.changeState(this.playerComponents.states.Shoot);
        this.playerComponents.state.shoot(point,'Move');
    }
}
