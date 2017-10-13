export class Key {
    public checked: boolean = false;
    constructor(public value: number,
                public codes: number[],
                public vector: any = null) {
    }
}
