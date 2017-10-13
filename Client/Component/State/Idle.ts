import {State} from './State';

export class Idle extends State {
    move(input: number) {
        this.playerComponents.changeState(this.playerComponents.states.Move);
        this.playerComponents.state.move(input);
    }

    shoot(point:PIXI.Point){
        this.playerComponents.changeState(this.playerComponents.states.Shoot);
        this.playerComponents.state.shoot(point, 'Idle');
    }
}
