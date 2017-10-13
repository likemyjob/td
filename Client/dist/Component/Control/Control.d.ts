export declare class ControlComponent {
    constructor();
    input: number;
    private pressed;
    private callbacks;
    keys: any;
    move: boolean;
    groups: {
        move: string[];
        shoot: string[];
    };
    checkMove(): void;
    subscribe(func: any): void;
    execute(): void;
    protected eventsListener(): void;
    private keyDown(e);
    private keyUp(e);
    encodeBitmask(): void;
    decodeBitmask(inputBitmask: number): void;
}
