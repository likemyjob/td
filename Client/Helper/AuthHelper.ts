import {Network} from '../Network';
import {AuthInt} from '../Interface/AuthInt';

export class AuthHelper {
    constructor(public  network: Network) {
        this.listener();
    }

    listener() {
        document.getElementById('authForm').addEventListener('submit', (event) => {
            let email: any    = (<HTMLInputElement>document.getElementById("email")).value;
            let password: any = document.getElementById('pass').getAttribute('value');

            let auth: AuthInt = {
                ready   : true,
                email   : email,
                password: password,
            };

            this.network.socket.emit('readyListen', auth);

            event.preventDefault();
            return false;
        });
    }
}
