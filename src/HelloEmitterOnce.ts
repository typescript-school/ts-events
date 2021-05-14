import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{
    sayHello(name: string){
        this.emit("hello", name);
    }
    onHello(callback: (name: string) => void ){
        this.once('hello', callback);
    }
}

const helloEmitter = new HelloEmitter();

helloEmitter.onHello((name : string) => {
    console.log("Hello from callback : ", name);
});

helloEmitter.sayHello("1");
helloEmitter.sayHello("2");
helloEmitter.sayHello("3");
