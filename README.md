[![npm version](https://img.shields.io/npm/v/@georapbox/timer.svg)](https://www.npmjs.com/package/@georapbox/timer)
[![npm license](https://img.shields.io/npm/l/@georapbox/timer.svg)](https://www.npmjs.com/package/@georapbox/timer)

[demo]: https://georapbox.github.io/Timer
[license]: https://github.com/georapbox/Timer/blob/master/LICENSE
[changelog]: https://github.com/georapbox/Timer/blob/master/CHANGELOG.md

# Timer

A lightweight, drift-free timer library built for the browser — precise, pause-resumable, and easy to use.

[API documentation](#api) &bull; [Demo][demo]

## Installation

```sh
npm install --save @georapbox/timer
```

The library is exported in ESM format. You can import it the following way:

```js
import { Timer } from '@georapbox/timer';
```

## API

### Constructor

```js
new Timer({ elapsed, duration })
```

**Options**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `elapsed` | `number` | Initial elapsed time in milliseconds. Default: `0`. Must be ≥ `0`. |
| `duration` | `number` | Total duration in milliseconds. Default: `Infinity`. Must be ≥ `0` or `Infinity`. |


**Throws**

- `TypeError` if either `elapsed` or `duration` is not a number.

**Notes**

- The timer is paused after construction; call `.start()` to begin.
- Internally drift-free: time is computed from absolute timestamps, not accumulated deltas.

### Instance Methods

All methods (except getters) return the instance for chaining.

#### `start()`

Starts or resumes the timer. Has no effect if the timer is already running or has reached its full duration (`elapsed >= duration`).

#### `stop()`

Pauses the timer. The elapsed time is preserved for resuming later.

#### `reset()`

Stops and resets the timer to its initial elapsed time (the value passed at construction).

#### `time()`

Returns a snapshot of the timer's current time state:

```js
const { elapsed, remaining } = timer.time();
```

- `elapsed` — elapsed time in ms
- `remaining` — remaining time in ms (`Infinity` if `duration` is `Infinity`)

#### `on(type, listener, options)`, `off(type, listener, options)`

Attach, detach, event listeners for timer events.  
(See [Events](#events) below for details.)

### Static Methods

#### `Timer.now()`

Returns a high-resolution, monotonic timestamp in milliseconds.
Uses `performance.now()` when available, otherwise falls back to `Date.now()`.

### Properties

#### `elapsed`

Returns the current elapsed time in milliseconds.

#### `remaining`

Returns the remaining time in milliseconds (`Infinity` if `duration` is `Infinity`).

#### `running`

Returns `true` if the timer is currently running; otherwise `false`.

### Events

The Timer instance emits standard `Event` objects using the DOM [`EventTarget`](https://developer.mozilla.org/docs/Web/API/EventTarget) API to signal state changes during its lifecycle. You can subscribe using `.on()` and unsubscribe using `.off()` methods.

| Event Name | Fired When | Notes |
| ---------- | ---------- | ----- |
| `start` | The timer starts or resumes after being stopped. | Fired once per start. |
| `tick` | On each animation frame while running. | Frequency depends on the browser's `requestAnimationFrame` (≈60fps). |
| `stop` | The timer is paused manually. | Elapsed time is preserved for resuming. |
| `reset` | The timer is reset to its initial elapsed time. | Stops the timer if running. |
| `finish` | The timer reaches its total duration. | Fired once automatically at completion. |

> [!NOTE]
> Events are standard `Event` objects (not `CustomEvent`s) emitted through the DOM `EventTarget` interface. They don't bubble through the document — they're scoped to the `Timer` instance itself.  
> To access timing data, call `.time()` or read `.elapsed` / `.remaining` from the event's `currentTarget`. 

> [!IMPORTANT]
> When removing listeners with `.off()`, you must pass the **same function reference** you used with `.on()`.  
> Creating a new anonymous function won't remove the previous listener — this mirrors native `addEventListener` / `removeEventListener` behavior in the DOM.

```js
const timer = new Timer({ duration: 5000 });

const onStart = () => console.log('Timer started');
const onTick = evt => {
  const { elapsed, remaining } = evt.currentTarget.time();
  console.log(`Elapsed: ${elapsed}ms, Remaining: ${remaining}ms`);
};
const onFinish = () => console.log('Timer finished');

timer
  .on('start', onStart)
  .on('tick', onTick)
  .on('finish', onFinish)
  .start();

  // Later...
  timer.
    off('start', onStart)
    .off('tick', onTick)
    .off('finish', onFinish);
```

### Usage Examples

#### Basic Countdown

```js
const timer = new Timer({ duration: 10_000 })
  .on('tick', evt => {
    const { remaining } = evt.currentTarget;
    label.textContent = `${Math.ceil(remaining / 1000)}s`;
  })
  .on('finish', () => {
    label.textContent = 'Done!';
  });

timer.start();
```

#### Pause and Resume

```js
timer.stop(); // Pause
// ...later
timer.start(); // Resume
```

#### Reset

```js
const t = new Timer({ elapsed: 2000, duration: 10_000 }); // start "2s in"
t.start();
// ...
t.reset(); // back to 2000ms elapsed
```

#### Infinite timer

```js
const infiniteTimer = new Timer({ duration: Infinity })
  .on('tick', () => console.log('Timer is running indefinitely'))
  .start();
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
