export declare class Observable {
    source: any;
    result: any;
    subscribers: any;
    subscribe(subscriber: any): void;
    filter(predicate: any): this;
    map(callback: any): this;
}
