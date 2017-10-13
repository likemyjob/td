import {Key} from './Key';

export class Keys {

    static move = ['left', 'up', 'right', 'down'];

    public left = new Key(
        1 << 0,
        [37, 65],
        {x: -1, y: 0},
    );

    public up = new Key(
        1 << 1,
        [38, 87],
        {x: 0, y: -1},
    );

    public right = new Key(
        1 << 2,
        [39, 68],
        {x: 1, y: 0},
    );

    public down = new Key(
        1 << 3,
        [40, 83],
        {x: 0, y: 1},
    );

    public shoot = new Key(
        1 << 4,
        [70],
    );
}
