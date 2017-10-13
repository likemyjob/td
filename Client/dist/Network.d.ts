import { EntityManager } from './Manager/EntityManager';
import { AuthHelper } from './Helper/AuthHelper';
export declare class Network {
    socket: any;
    em: EntityManager;
    auth: AuthHelper;
    constructor();
    connect(): void;
    listeners(): void;
}
