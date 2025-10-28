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
new Timer(elapsedTime, duration)
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `elapsedTime` | `number` | Initial elapsed time in milliseconds. Clamped to `[0, duration]`. Use `0` to start fresh. |
| `duration` | `number` | Total duration in milliseconds. Use `Infinity` for an endless timer. |

**Throws**

- `TypeError` if either argument is not a number or is `NaN`.

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

Returns the current timing info:

```js
const { elapsed, remaining } = timer.time();
```

- `elapsed` — elapsed time in ms
- `remaining` — remaining time in ms (`Infinity` if `duration` is `Infinity`)

#### `isRunning()`

Returns `true` if the timer is currently running.

### `on(type, listener)`, `off(type, listener)`

Attach, detach, event listeners for timer events.  
(See [Events](#events) below for details.)

### Static Methods

#### `Timer.now()`

Returns a high-resolution, monotonic timestamp in milliseconds.
Uses `performance.now()` when available, otherwise falls back to `Date.now()`.

### Events

Timer emits **DOM CustomEvents**. Event data is provided via the `detail` field.

| Event Name | Description | Event Detail |
| ---------- | ----------- | ------------ |
| `tick` | Emitted on each frame frame while running. | `{elapsed: number, remaining: number}` |
| `start` | Emitted when the timer starts or resumes. | `{elapsed: number, remaining: number}` |
| `stop` | Emitted when the timer is paused. | `{elapsed: number, remaining: number}` |
| `reset` | Emitted when the timer is reset. | `{elapsed: number, remaining: number}` |
| `finish` | Emitted when the timer reaches its duration. | `{elapsed: number, remaining: number}` |

### Usage Examples

#### Basic Countdown

```js
const timer = new Timer(0, 10_000) // 10 seconds
  .on('tick', (e) => {
    const { remaining } = e.detail;
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
const t = new Timer(2000, 10_000); // start "2s in"
t.start();
// ...
t.reset(); // back to 2000ms elapsed
```

#### Infinite timer

```js
const infiniteTimer = new Timer(0, Infinity)
  .on('tick', () => console.log('Timer is running indefinitely'))
  .start();
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
