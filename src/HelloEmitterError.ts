import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{
    constructor() {
        super();
        this.on('error', this.onError);
    }
    sayHello(name: string){
        this.emit("hello", name);
    }
    onHello(callback: (name: string) => void ){
        this.on('hello', callback);
    }
    onError(error: any){
        console.error("Error : ", error.message);
        this.removeAllListeners();
    }
}

const helloEmitter = new HelloEmitter();

helloEmitter.onHello((name : string) => {
    console.log("Hello from callback : ", name);
});

console.log("before emit")
helloEmitter.emit("error", new Error("an error message"));
helloEmitter.emit("hello", "nishants");
console.log("after emit")

// Outptut :
// before emit
// Error :  an error message
// after emit
