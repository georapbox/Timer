// @ts-check

/** @typedef {'start'|'stop'|'reset'|'finish'|'tick'} TimerEventType */

/**
 * A high-resolution timer class that uses requestAnimationFrame for timing.
 * Suitable for animations and time-based events in web applications.
 */
export class Timer {
  /**
   * Get high-resolution timestamp.
   * Uses `performance.now()` when available for sub-millisecond precision.
   *
   * @returns {number} - The current timestamp in milliseconds.
   */
  static now() {
    return 'performance' in window ? performance.now() : Date.now();
  }

  /**
   * Creates a new Timer instance.
   *
   * @param {number} elapsedTime - The elapsed time in milliseconds. Must be between 0 and duration.
   * @param {number} duration - The total duration in milliseconds.
   * @throws {TypeError} - If `duration` is not a number or `NaN`.
   * @throws {TypeError} - If `elapsedTime` is not a number or `NaN`.
   */
  constructor(elapsedTime, duration) {
    if (typeof elapsedTime !== 'number' || Number.isNaN(elapsedTime)) {
      throw new TypeError('Expected a number for "elapsedTime"');
    }

    if (typeof duration !== 'number' || Number.isNaN(duration)) {
      throw new TypeError('Expected a number for "duration"');
    }

    this._running = false;
    this._duration = Math.max(0, duration);
    this._elapsed = Math.min(Math.max(0, elapsedTime), this._duration);
    this._initialElapsed = this._elapsed;
    this._startTime = 0;
    this._pauseOffset = this._elapsed;
    this._tick = this._tick.bind(this);
    this._events = new EventTarget();
  }

  /**
   * Adds an event listener for the specified event type.
   *
   * @param {TimerEventType} type - The event type to listen for.
   * @param {EventListener} handler - The event handler function.
   * @param {boolean|AddEventListenerOptions} [options] - Optional options for the event listener.
   * @returns {Timer} - The Timer instance.
   */
  on(type, handler, options) {
    this._events.addEventListener(type, handler, options);
    return this;
  }

  /**
   * Removes an event listener for the specified event type.
   *
   * @param {TimerEventType} type - The event type to remove the listener for.
   * @param {EventListener} handler - The event handler function to remove.
   * @param {boolean|EventListenerOptions} [options] - Optional options for the event listener.
   * @returns {Timer} - The Timer instance.
   */
  off(type, handler, options) {
    this._events.removeEventListener(type, handler, options);
    return this;
  }

  /**
   * Emits an event of the specified type.
   *
   * @param {TimerEventType} type - The event type to emit.
   */
  _emit(type) {
    const evt = new CustomEvent(type, { detail: this.time() });
    this._events.dispatchEvent(evt);
  }

  /**
   * Internal RAF loop.
   * Updates time and invokes callback each frame.
   * Stops automatically when the duration elapses.
   */
  _tick() {
    if (!this._running) {
      return;
    }

    const elapsed = Timer.now() - this._startTime + this._pauseOffset;
    this._elapsed = Math.min(elapsed, this._duration);

    this._emit('tick');

    if (elapsed < this._duration) {
      requestAnimationFrame(this._tick);
    } else {
      this._running = false;
      this._pauseOffset = this._elapsed;
      this._emit('finish');
    }
  }

  /**
   * Starts or resumes the timer.
   * If already running, has no effect.
   */
  start() {
    if (this._running || this._elapsed >= this._duration) {
      return this;
    }
    this._running = true;
    this._startTime = Timer.now();
    this._emit('start');
    requestAnimationFrame(this._tick);
    return this;
  }

  /**
   * Stops/pauses the timer.
   * Can be resumed later with `start()`.
   *
   * @returns {Timer} - The Timer instance.
   */
  stop() {
    if (!this._running) {
      return this;
    }
    this._running = false;
    this._pauseOffset = this._elapsed;
    this._emit('stop');
    return this;
  }

  /**
   * Resets the timer to its initial state.
   *
   * @returns {Timer} - The Timer instance.
   */
  reset() {
    this._running = false;
    this._elapsed = this._initialElapsed;
    this._pauseOffset = this._initialElapsed;
    this._startTime = 0;
    this._emit('reset');
    return this;
  }

  /**
   * Returns the remaining and elapsed time in milliseconds.
   *
   * @returns {{remaining: number, elapsed: number}} - An object literal that contains the remaining and the elapsed time in milliseconds.
   */
  time() {
    return {
      elapsed: this._elapsed,
      remaining: Math.max(0, this._duration - this._elapsed)
    };
  }

  /**
   * Returns whether the timer is currently running.
   *
   * @returns {boolean} - `true` if the timer is running, `false` otherwise.
   */
  isRunning() {
    return this._running;
  }
}
