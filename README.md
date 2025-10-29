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

Starts or resumes the timer. No effect if it's already running or finished.

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

Timer emits **DOM Events** to signal state changes. You can listen to these events using the `on` and `off` methods.

| Event Name | Description |
| ---------- | ----------- |
| `tick` | Emitted on each frame frame while running. |
| `start` | Emitted when the timer starts or resumes. |
| `stop` | Emitted when the timer is paused. |
| `reset` | Emitted when the timer is reset. |
| `finish` | Emitted when the timer reaches its duration. |

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
