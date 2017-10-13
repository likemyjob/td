import {TransferHard} from './Interface/TransferHard';
import {Container, Service} from 'typedi';
import {EntityManager} from './Manager/EntityManager';
import {Player} from './Entity/Player';
import {TransferInit} from './Interface/TransferInit';
import {AuthHelper} from './Helper/AuthHelper';

let io = require('../node_modules/socket.io-client');

@Service()
export class Network {

    public socket: any;

    public em: EntityManager = Container.get(EntityManager);

    auth: AuthHelper = new AuthHelper(this);

    constructor() {
        this.connect();
    }

    public connect() {
        this.socket = io('http://127.0.0.1:8081');

        setTimeout(() => {
            this.listeners();
        }, 1000);
    }

    listeners() {
        let player = Container.get(Player);
        this.em.addEntity(player);

        this.socket.on('GError', (data: any) => {
            console.log(data);
        });

        this.socket.on('initPlayer', (data: TransferInit) => {
            player.display();
            player.setParams(data);
        });

        this.socket.on('initEntity', (data: TransferInit) => {
            this.em.createEntity(data);
        });

        this.socket.on('transfer', (data: TransferHard) => {
            this.em.update(data);
        });

        this.socket.on('destroyEntity', (data: TransferHard) => {
            this.em.destroyEntity(data);
        });

    }
}
