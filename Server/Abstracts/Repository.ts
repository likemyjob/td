import {MysqlDb} from '../Db/MysqlDb';
import {Container} from 'typedi';

export abstract class Repository {
    db: MysqlDb;

    constructor() {
        this.db = Container.get(MysqlDb);
    }

    getQb(sql: string, fields: string[] = [], callback = null) {
        this.db.connection.query(sql,
            fields,
            (err, results: any) => {
                if (err) {
                    console.log(err);
                }
                if (typeof callback === 'function') {
                    callback(results, err);
                }
            });
    }
}
