import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{
    sayHello(name: string){
        return `Hello ${name}`
    }
}

const helloEmitter = new HelloEmitter();

helloEmitter.on('hello', function sayHello(this: HelloEmitter, name: string){
    this.sayHello(name);
});

helloEmitter.emit("hello", "nishants");
