import {PhysicalObject} from './PhysicalObject';

let box2d = require('box2dweb/box2d.js');

export class StaticObject extends PhysicalObject {
    constructor(dbObject, worldB2) {
        super(dbObject, worldB2);
        this.initBody();
    }
}
