import {Player} from './Entity/Player';
import {Container} from 'typedi';
import {WorldManager} from './Manager/WorldManager';

let app: any    = require('express')();
let server: any = require('http').Server(app);

export class Driver {
    public io: any;
    // em: EntityManager = Container.get(EntityManager);
           wm: WorldManager = Container.get(WorldManager);

    constructor() {
        server.listen(8081);
        this.io = require('socket.io')(server);
        console.log('server work');
        this.listen();
    }

    public listen() {
        this.io.on('connection', (socket: any) => {

            //TODO check world

            let em     = this.wm.worlds[0].em;
            em.createPlayer(socket);


            socket.on('disconnect', () => {
                console.log('disconnect ' + socket.id);
                let player = em.players.find((el: Player) => (el.socket.id === socket.id));
                em.destroyPlayer(player);
            });
        });
    }
}
