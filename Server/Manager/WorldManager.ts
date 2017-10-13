import {Service} from "typedi";
import {WorldB2} from '../WorldB2/WorldB2';
@Service()
export class WorldManager {
    worlds: WorldB2[] = [];

    counter:number = 0;

    constructor(){
        this.addWorld(new WorldB2());
    }

    addWorld(world: WorldB2) {
        this.counter++;
        world.id = this.counter;
        this.worlds.push(world);
    }
}
