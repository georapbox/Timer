[![npm version](https://img.shields.io/npm/v/@georapbox/timer.svg)](https://www.npmjs.com/package/@georapbox/timer)
[![npm license](https://img.shields.io/npm/l/@georapbox/timer.svg)](https://www.npmjs.com/package/@georapbox/timer)

[demo]: https://georapbox.github.io/Timer
[license]: https://github.com/georapbox/Timer/blob/master/LICENSE
[changelog]: https://github.com/georapbox/Timer/blob/master/CHANGELOG.md

# Timer

A lightweight, drift-free timer library built for the browser — precise, pause-resumable, and easy to use.

> [!NOTE]  
> Depends on `window.requestAnimationFrame`. If your environment does not support it, you can [polyfill](https://github.com/darius/requestAnimationFrame).

[API documentation](#api) &bull; [Demo][demo]

## Installation

```sh
npm install --save @georapbox/timer
```

The library is exported in ESM format. You can import it the following way:

```js
import { Timer } from '@georapbox/timer';
```

## Usage

```js
import { Timer } from '@georapbox/timer';

// Create a timer with 5 seconds duration
const timer = new Timer(0, 5000, t => {
  const time = t.time();
  console.log(`Elapsed: ${time.elapsed} ms, Remaining: ${time.remaining} ms`);
});

// Start the timer
timer.start();

// After 2 seconds, stop the timer
setTimeout(() => {
  timer.stop();
  console.log('Timer stopped');
}, 2000);
```

## API

<a name="Timer"></a>

* [Timer](#Timer)
  * [new Timer(elapsedTime, duration, [callback])](#new_Timer_new)
  * [.time()](#Timer+time) ⇒ <code>{remaining: number, elapsed: number}</code>
  * [.start()](#Timer+start) ⇒ [<code>Timer</code>](#Timer)
  * [.stop()](#Timer+stop) ⇒ [<code>Timer</code>](#Timer)
  * [.reset()](#Timer+reset) ⇒ [<code>Timer</code>](#Timer)
  * [.isRunning()](#Timer+isRunning) ⇒ <code>boolean</code>

<a name="new_Timer_new"></a>

### new Timer(elapsedTime, duration, [callback])

Timer constructor: Creates a new Timer instance.

**Throws**:

- <code>TypeError</code> If `duration` is not a number or `NaN`.
- <code>TypeError</code> If `elapsedTime` is not a number or `NaN`.


| Param | Type | Description |
| --- | --- | --- |
| elapsedTime | <code>number</code> | The elapsed time in milliseconds. Must be between 0 and duration. |
| duration | <code>number</code> | The total duration in milliseconds. |
| [callback] | <code>(timer: Timer) => void</code> | Optional callback executed on each frame. It receives the `Timer` instance as an argument. |

<a name="Timer+time"></a>

### timer.time() ⇒ <code>{remaining: number, elapsed: number}</code>
Get the remaining and elapsed time.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: <code>{remaining: number, elapsed: number}</code> - An object literal that contains the remaining and the elapsed time in milliseconds.  
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

### timer.isRunning() ⇒ <code>boolean</code>
Checks (at any time) if the timer is running or not.

**Kind**: instance method of [<code>Timer</code>](#Timer)  
**Returns**: <code>boolean</code> - `true` if the timer is running; otherwise `false`.  

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
