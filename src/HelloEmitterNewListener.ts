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

helloEmitter.on('newListener', function addBeforeListener(this: HelloEmitter,event, listener) {
    console.log(`Added new listener on ${event} : ${listener}`)
});

helloEmitter.onHello((name : string) => {
  console.log("First callback : ", name);
});

helloEmitter.onHello((name : string) => {
    console.log("Second callback : ", name);
});

helloEmitter.sayHello("nishants");

// Output :
//Added new listener on hello : (name) => {
//     console.log("First callback : ", name);
// }
// Added new listener on hello : (name) => {
//     console.log("Second callback : ", name);
// }
// First callback :  nishants
// Second callback :  nishants
