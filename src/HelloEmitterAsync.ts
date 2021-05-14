import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{
    sayHello(name: string){
        this.emit("hello", name);
    }
    onHello(callback: (name: string) => void ){
        this.on('hello', (name) => {
            setImmediate(() => {
                callback(name);
            })
        });
    }
}

const helloEmitter = new HelloEmitter();

helloEmitter.onHello((name : string) => {
    console.log("first callback : ", name);
});

helloEmitter.onHello((name : string) => {
    console.log("second callback : ", name);
    // while(true){}
});

helloEmitter.onHello((name : string) => {
    console.log("third callback : ", name);
});

console.log("before emit")
helloEmitter.sayHello("nishants");
console.log("after emit")
