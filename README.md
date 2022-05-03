[![npm version](https://img.shields.io/npm/v/@georapbox/timer.svg)](https://www.npmjs.com/package/@georapbox/timer)
[![Build Status](https://travis-ci.com/georapbox/Timer.svg?branch=master)](https://travis-ci.com/georapbox/Timer)
[![Coverage Status](https://coveralls.io/repos/github/georapbox/Timer/badge.svg?branch=master)](https://coveralls.io/github/georapbox/Timer?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://georapbox.mit-license.org/@2018)

# Timer

Minimal javascript library to create and manage timers

**NOTE:** Depends on `window.requestAnimationFrame`. If your environment does not support it, you can [polyfill](https://github.com/darius/requestAnimationFrame).

## Install

```sh
$ npm install @georapbox/timer --save
```

## Usage

The library is exported in UMD, CommonJS, and ESM formats. You can import it the following ways:

### Using ESM import statement

```js
import Timer from '@georapbox/timer';
```

### Using CommonJS require statement

```js
const Timer = require('@georapbox/timer').default;
```

### As old school browser global

```html
<script src="https://unpkg.com/@georapbox/timer"></script>
```

## API

* [Timer](#Timer)
  * [new Timer(duration, elapsedTime, [callback])](#new_Timer_new)
  * [.time()](#Timer+time) ⇒ <code>Object</code>
  * [.start([shouldReset])](#Timer+start) ⇒ <code>[Timer](#Timer)</code>
  * [.stop()](#Timer+stop) ⇒ <code>[Timer](#Timer)</code>
  * [.reset([shouldStop])](#Timer+reset) ⇒ <code>[Timer](#Timer)</code>
  * [.isRunning()](#Timer+isRunning) ⇒ <code>Boolean</code>

<a name="new_Timer_new"></a>

### new Timer(duration, elapsedTime, [callback])

Creates a Timer instance.

**Throws**:

- <code>TypeError</code> If `duration` is not a number or `NaN`.
- <code>TypeError</code> If `elapsedTime` is not a number or `NaN`.

| Param | Type | Description |
| --- | --- | --- |
| elapsedTime | <code>Number</code> | The time that has elapsed in milliseconds. If negative number provided, it will become `0`. If a number greater than `duration` is provided, it will become equal to `duration`. |
| duration | <code>Number</code> | The timer's duration in milliseconds. If negative number provided, it will become `0`. |
| [callback] | <code>function</code> | Function to be executed while timer is running. The `Timer` instance is passed by as parameter. |

<a name="Timer+time"></a>

### timer.time() ⇒ <code>Object</code>

Get the remaining and elapsed time.

**Kind**: instance method of <code>[Timer](#Timer)</code>  
**Returns**: <code>Object</code> - An object that contains the remaining and the elapsed time in milliseconds.  

<a name="Timer+start"></a>

### timer.start([shouldReset]) ⇒ <code>[Timer](#Timer)</code>

Start the timer.  
If the timer instance has been already started, the timer will just resume.

**Kind**: instance method of <code>[Timer](#Timer)</code>  
**Returns**: <code>[Timer](#Timer)</code> - The Timer instance.  

| Param | Type | Description |
| --- | --- | --- |
| [shouldReset] | <code>Boolean</code> | If set to `true`, the timer will reset to initial specified duration. |

<a name="Timer+stop"></a>

### timer.stop() ⇒ <code>[Timer](#Timer)</code>

Stop/Pause the timer.

**Kind**: instance method of <code>[Timer](#Timer)</code>  
**Returns**: <code>[Timer](#Timer)</code> - The Timer instance.  

<a name="Timer+reset"></a>

### timer.reset([shouldStop]) ⇒ <code>[Timer](#Timer)</code>

Resets the timer to initial specified duration.

**Kind**: instance method of <code>[Timer](#Timer)</code>  
**Returns**: <code>[Timer](#Timer)</code> - The Timer instance.  

| Param | Type | Description |
| --- | --- | --- |
| [shouldStop] | <code>Boolean</code> | If set to `true`, the timer will be forced to stop; otherwise will reset and continue running. |

<a name="Timer+isRunning"></a>

### timer.isRunning() ⇒ <code>Boolean</code>

Check (at any time) if the timer is running or not.

**Kind**: instance method of <code>[Timer](#Timer)</code>  
**Returns**: <code>Boolean</code> - True if the timer is running; otherwise false.  

## Test

```sh
$ npm run test
```

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2018)
