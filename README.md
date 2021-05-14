# Events

- NodeJS is **asynchronous even driven architecture**.
- So, most of its core API's are impemented using **event-emitters**





### **EventEmitter** 

- emits event with **names**, that invokes a `function`
- Represents an object that emits events
- **CamelCase** is the preferred convention for naming events.



### Events are **Synchrounous**

- For each event emitted, the listerners are invoked asynchounously
- ***Does that mean a blocking listener with block ?*** 





**Setup**

- Create typescript cli app from https://github.com/typescript-school/ts-cli-app







**Refer:** 

- https://nodejs.org/api/events.html#events_class_eventemitter