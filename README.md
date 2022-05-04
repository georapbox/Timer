[![npm version](https://img.shields.io/npm/v/@georapbox/timer.svg)](https://www.npmjs.com/package/@georapbox/timer)
[![Build Status](https://travis-ci.com/georapbox/Timer.svg?branch=master)](https://travis-ci.com/georapbox/Timer)
[![Coverage Status](https://coveralls.io/repos/github/georapbox/Timer/badge.svg?branch=master)](https://coveralls.io/github/georapbox/Timer?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://georapbox.mit-license.org/@2018)

# Timer

Minimal javascript library to create and manage timers

**NOTE:** Depends on `window.requestAnimationFrame`. If your environment does not support it, you can [polyfill](https://github.com/darius/requestAnimationFrame).

[API documentation](#api) &bull; [Demo](https://georapbox.github.io/timer/)

## Installation

```sh
$ npm install @georapbox/timer --save
```

The library is exported in UMD, CommonJS, and ESM formats. You can import it the following ways:

### Using ESM import statement

```js
import Timer from '@georapbox/timer';
```

### Using CommonJS require statement

```js
const Timer = require('@georapbox/timer');
```

### As old school browser global

```html
<script src="https://unpkg.com/@georapbox/timer/dist/Timer.umd.min.js"></script>
```

## API

<a name="Timer"></a>

* [Timer](#Timer)
  * [new Timer(elapsedTime, duration, [callback])](#new_Timer_new)
  * [.time()](#Timer+time) ⇒ <code>Object</code>
  * [.start()](#Timer+start) ⇒ [<code>Timer</code>](#Timer)
  * [.stop()](#Timer+stop) ⇒ [<code>Timer</code>](#Timer)
  * [.reset()](#Timer+reset) ⇒ [<code>Timer</code>](#Timer)
  * [.isRunning()](#Timer+isRunning) ⇒ <code>Boolean</code>

<a name="new_Timer_new"></a>

### new Timer(elapsedTime, duration, [callback])

Timer constructor: Creates a new Timer instance.

**Throws**:

- <code>TypeError</code> If `duration` is not a number or `NaN`.
- <code>TypeError</code> If `elapsedTime` is not a number or `NaN`.


| Param | Type | Description |
| --- | --- | --- |
| elapsedTime | <code>Number</code> | The time that has elapsed in milliseconds. If a negative number provided, it will become `0`. If a number greater than `duration` is provided, it will become equal to `duration`. |
| duration | <code>Number</code> | The timer's duration in milliseconds. If a negative number provided, it will become `0`. |
| [callback] | <code>function</code> | Function to be executed while timer is running. The `Timer` instance is passed by as parameter. |

<a name="Timer+time"></a>

### timer.time() ⇒ <code>Object</code>
Get the remaining and elapsed time.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: <code>Object</code> - An object literal that contains the remaining and the elapsed time in milliseconds.  
<a name="Timer+start"></a>

### timer.start() ⇒ [<code>Timer</code>](#Timer)
Starts the timer. If the timer instance has been already started, the timer will just resume.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: [<code>Timer</code>](#Timer) - The Timer instance.  

<a name="Timer+stop"></a>

### timer.stop() ⇒ [<code>Timer</code>](#Timer)
Stops/Pauses the timer.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: [<code>Timer</code>](#Timer) - The Timer instance.  
<a name="Timer+reset"></a>

### timer.reset() ⇒ [<code>Timer</code>](#Timer)
Resets the timer to its initial state.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: [<code>Timer</code>](#Timer) - The Timer instance.  

<a name="Timer+isRunning"></a>

### timer.isRunning() ⇒ <code>Boolean</code>
Checks (at any time) if the timer is running or not.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: <code>Boolean</code> - `true` if the timer is running; otherwise `false`.  
## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2018)
