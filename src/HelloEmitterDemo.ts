import EventEmitter from 'events';

class HelloEmitter extends EventEmitter{}

const helloEmitter = new HelloEmitter();

// An events that takes a string arg
helloEmitter.on('hello', function sayHello(name){
    console.log("Hello ", name);
});

helloEmitter.emit("hello", "nishants");
