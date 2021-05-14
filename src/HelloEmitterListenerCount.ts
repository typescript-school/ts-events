import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{
    sayHello(name: string){
        this.emit("hello", name);
    }
    onHello(callback: (name: string) => void ){
        this.on('hello', callback);
    }
}

const helloEmitter = new HelloEmitter();
// helloEmitter.setMaxListeners(Infinity);
const listenerCount = 13;
for(let i =0; i < listenerCount; i++){
    helloEmitter.onHello((name : string) => {
        console.log(`#${i}: `, name);
    });
}

console.log("before emit")
helloEmitter.sayHello("nishants");
console.log("after emit")
