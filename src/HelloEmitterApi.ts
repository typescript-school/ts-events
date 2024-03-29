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

helloEmitter.onHello((name : string) => {
    console.log("Hello from callback : ", name);
});

console.log("before emit")
helloEmitter.sayHello("nishants");
console.log("after emit")
