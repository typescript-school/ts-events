# Events

- NodeJS is **asynchronous even driven architecture**.
- So, most of its core API's are impemented using **event-emitters**



### Contents

- `EventEmitter` class

  > event names are camelCase strings (valid js property names) and listeners ares imply functions

- `this` inside listerner functions

  > `this` inside listerner function refers to the emittor.

- Events are ***synchronous***

  >  Listeners invoked asynchrounously in order of registration
  >
  > Use custom logic to run synchronously using `setImmediate()`

- Running listernes once

  

### **EventEmitter** 

- emits event with **names**, that invokes a `function`

- Represents an object that emits events

- **CamelCase** is the preferred convention for naming events.

  Create a class `src/HelloEmitter.ts`

  ```typescript
  import EventEmitter from 'events';
  
  class HelloEmitter extends EventEmitter{}
  
  const helloEmitter = new HelloEmitter();
  
  // An events that takes a string arg
  helloEmitter.on('hello', function sayHello(name){
      console.log("Hello ", name);
  });
  
  helloEmitter.emit("hello", "nishants");
  ```



### Using `this` keyword in listeners

- `this` keyword in listerner referes to the emitter object

  ```typescript
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
  ```

  

### Abstracting emitter in API 

- Classes can abstract emitter, for example : 

  ```typescript
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
  
  helloEmitter.sayHello("nishants");
  ```

  

### Events are **Synchrounous**

- For each event emitted, the listerners are invoked asynchounously

  ```typescript
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
  
  // Output : 
  // before emit
  // first callback :  nishants
  // second callback :  nishants
  // third callback :  nishants
  // after emit
  
  ```

  

- ***Does that mean a blocking listener with block ?*** 

  > Yes.

  Blocking 

  ```typescript
  helloEmitter.onHello((name : string) => {
      console.log("first callback : ", name);
  });
  
  helloEmitter.onHello((name : string) => {
      console.log("second callback : ", name);
      while(true){}
  });
  
  helloEmitter.onHello((name : string) => {
      console.log("third callback : ", name);
  });
  
  helloEmitter.sayHello("nishants");
  
  // Output : 
  // first callback :  nishants
  // second callback :  nishants
  ```



- Running asynchounously using `setImmediate`

  ```typescript
  onHello(callback: (name: string) => void ){
    this.on('hello', (name) => {
      setImmediate(() => {
        callback(name);
      })
    });
  }
  
  // Output : 
  // before emit
  // after emit
  // first callback :  nishants
  // second callback :  nishants
  // third callback :  nishants
  ```

  





**Setup**

- Create typescript cli app from https://github.com/typescript-school/ts-cli-app







**Refer:** 

- https://nodejs.org/api/events.html#events_class_eventemitter