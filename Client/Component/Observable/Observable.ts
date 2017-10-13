export class Observable {
    source: any;
    result: any;

    subscribers: any = [];

    subscribe(subscriber: any) {
        this.subscribers.push(subscriber);
        this.subscribers.forEach((callback:any)=>{
            callback(this.result);
        });
    }

    filter(predicate: any) {
        this.result = this.result.filter(predicate);
        return this;
    }

    map(callback: any) {
        this.result = this.result.map(callback);
        return this;
    }
}
