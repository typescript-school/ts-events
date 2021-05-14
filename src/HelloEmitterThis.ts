import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{
    sayHello(name: string){
        return `Hello ${name}`
    }
}

const helloEmitter = new HelloEmitter();

helloEmitter.on('hello', function sayHello(this: HelloEmitter, name: string){
    const message = this.sayHello(name);
    console.log("Message from HelloEmitter.sayHello", message)
});

helloEmitter.emit("hello", "nishants");
