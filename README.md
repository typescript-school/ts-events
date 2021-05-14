# Events

- NodeJS is **asynchronous even driven architecture**.
- So, most of its core API's are impemented using **event-emitters**



### Contents

- `EventEmitter` class

  > event names are camelCase strings (valid js property names) and listeners ares imply functions

- Events are ***synchronous***

  >  

  

### **EventEmitter** 

- emits event with **names**, that invokes a `function`

- Represents an object that emits events

- **CamelCase** is the preferred convention for naming events.

  Create a class `src/HelloEmittor.ts`

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

  



### Events are **Synchrounous**

- For each event emitted, the listerners are invoked asynchounously
- ***Does that mean a blocking listener with block ?*** 





**Setup**

- Create typescript cli app from https://github.com/typescript-school/ts-cli-app







**Refer:** 

- https://nodejs.org/api/events.html#events_class_eventemitter