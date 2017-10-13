import {IConnection} from 'mysql';
import {Service} from 'typedi';
import {Entity} from '../../Client/Abstract/Entity';

let mysql = require('mysql');

@Service()
export class MysqlDb {
    connection: IConnection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        database: 'mytest',
        password: 'root',
    });

    constructor() {
        this.createConnection();
    }

    createConnection() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('connected to database');
            }
        });
        this.connection.on('error', () => {
        });
    }

    getUsersFromEmail(email: string, callback: any) {
        this.connection.query('SELECT * FROM user WHERE email = ?', [email],
            (err, results: any) => {
                if (results.length > 0) {
                    console.log('db id ' + results[0].id);
                }

                if (typeof callback === 'function') {
                    callback(results);
                }
            });
    }

    getObjects(obj: Entity | any, callback = null, params = []) {
        let table = obj.name.toLowerCase();
        let sql   = 'SELECT * FROM ??';

        if (params.length) {
            params.forEach((param: Param) => {
                sql += param.apply(table);
            });
        }

        this.connection.query(sql,
            [table],
            (err, results: Entity[]) => {
                if (err) {
                    console.log(err);
                }
                if (typeof callback === 'function') {
                    callback(results, err);
                }
            });
    }

    updateObject(object) {
        let table = object.constructor.name.toLowerCase();
        object    = this.normalizeEntity(object);
        this.connection.query('UPDATE ' + table + ' SET ? WHERE id = ?', [object, object.id]);
    }

    normalizeEntity(object) {
        object.position.x = object.position.x.toFixed(2);
        object.position.y = object.position.y.toFixed(2);
        object.position   = JSON.stringify(object.position);
        return object;
    }
}

export class Param {
    table: string;

    apply(table) {
        this.table = table;
    };
}
