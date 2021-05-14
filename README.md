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

  > `emitter.once` removes listener before invoking them. So they run once.

- Default listeners

  > By default `10` listeners only. Use ``setMaxListeners(n)` to set to `Infinity` or any other number

- Error handler 

  > If no error handler created, nodejs crashes on error events. 

- Max Listeners

  > Default is 10.
  >
  > More than max listener will show warning of memory leak.
  >
  > use `emitter.setMaxListener(n)` to set to `Infinity` or as you like.

- Prepend Listeners

  > use `event.prependListener` or `emitter.prependOnceListener` to add as first listener. 
  >
  > Allows duplicate listener.

- Remove listeners

  > use `emiter.removeAllListeners` or `emitter.removeListener(eventName, listener)`

- Capturinig when a new listener is added 

  > use `helloEmitter.on(` **`'newListener'`** `, calback)` to run code whenever a new listener is added.

- [ ] Prepend listerner : https://nodejs.org/api/events.html#events_emitter_prependlistener_eventname_listener

- [ ] Remove listener : 

- [ ] Get events names

- [ ] Get all listeners

- [ ] prepend once listener

- [ ] remove all listeners

- [ ] Monitor externally

  - [ ] ``events.getEventListeners(emitterOrTarget, eventName)``
  - [ ] ``

  

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

  

### Running listener once 

- If we emit event multiple time in previous examples, it will run listener each time

  ```typescript
  helloEmitter.sayHello("1");
  helloEmitter.sayHello("2");
  helloEmitter.sayHello("3");
  
  // Outptut: 
  // Hello from callback :  1
  // Hello from callback :  2
  // Hello from callback :  3
  ```

- Use `emitter.once` 

  > emitter will remove listener before invoking it the first time. Hence no further invocations.

- ```typescript
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
  
  helloEmitter.sayHello("1");
  helloEmitter.sayHello("2");
  helloEmitter.sayHello("3");
  
  // Outptut: 
  // Hello from callback :  1
  ```

  

### Error handling

- An event with name `error` has special treatment.

- If ther is no handler for it, **node process will crash** when it is emitted on any emitter.

- Hanlding error event : 

  ```typescript
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
          console.error("Error : ", error);
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
  ```

  

### Number of event listeners

- By default there are only `10` listeners. For more than that, you get warning : 

  ```
  MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 hello listeners added to [HelloEmitter].
  ```

- `setMaxListeners` to set to `Infinity` 

  ```typescript
  const helloEmitter = new HelloEmitter();
  
  // Set max listener to avoid warnings on memory leak
  helloEmitter.setMaxListeners(Infinity);
  
  const listenerCount = 13;
  for(let i =0; i < listenerCount; i++){
      helloEmitter.onHello((name : string) => {
          console.log(`#${i}: `, name);
      });
  }
  ```



### Capturinig when a new listener is added 

- Use event ``newListener`` to get callback and event name whenever a new listener is added.

  ```typescript
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
  ```

  

**Setup**

- Create typescript cli app from https://github.com/typescript-school/ts-cli-app



**Refer:** 

- https://nodejs.org/api/events.html#events_class_eventemitter