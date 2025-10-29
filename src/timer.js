// @ts-check

/** @typedef {'start' | 'stop' | 'reset' | 'finish' | 'tick'} TimerEventType */

/**
 * A high-resolution timer class that uses requestAnimationFrame for timing.
 * Suitable for animations and time-based events in web applications.
 */
export class Timer extends EventTarget {
  /** @type {boolean} */ #running = false;
  /** @type {number}  */ #duration = 0;
  /** @type {number}  */ #elapsed = 0;
  /** @type {number}  */ #initialElapsed = 0;
  /** @type {number}  */ #startTime = 0;
  /** @type {number}  */ #pauseOffset = 0;

  /**
   * Creates a new Timer instance.
   *
   * @param {{ elapsed?: number, duration?: number }} [options] - Optional configuration object.
   * @throws {TypeError} - If `options.duration` is not a number or `NaN`.
   * @throws {TypeError} - If `options.elapsed` is not a number or `NaN`.
   */
  constructor(options) {
    super();

    const defaults = { elapsed: 0, duration: Infinity };
    const opts = { ...defaults, ...options };
    const { elapsed, duration } = opts;

    if (typeof elapsed !== 'number' || Number.isNaN(elapsed)) {
      throw new TypeError('elapsed option must be a number');
    }

    if (typeof duration !== 'number' || Number.isNaN(duration)) {
      throw new TypeError('duration option must be a number');
    }

    this.#running = false;
    this.#duration = Math.max(0, duration);
    this.#elapsed = Math.min(Math.max(0, elapsed), this.#duration);
    this.#initialElapsed = this.#elapsed;
    this.#startTime = 0;
    this.#pauseOffset = this.#elapsed;
  }

  /**
   * Emits an event of the specified type.
   *
   * @param {TimerEventType} type - The event type to emit.
   */
  #emit(type) {
    this.dispatchEvent(new Event(type));
  }

  /**
   * Internal RAF loop.
   * Updates time and invokes callback each frame.
   * Stops automatically when the duration elapses.
   */
  #tick = () => {
    if (!this.#running) {
      return;
    }

    const elapsed = Timer.now() - this.#startTime + this.#pauseOffset;
    this.#elapsed = Math.min(elapsed, this.#duration);

    this.#emit('tick');

    if (elapsed < this.#duration) {
      requestAnimationFrame(this.#tick);
    } else {
      this.#running = false;
      this.#pauseOffset = this.#elapsed;
      this.#emit('finish');
    }
  };

  /**
   * Adds an event listener for the specified event type.
   *
   * @param {TimerEventType} type - The event type to listen for.
   * @param {EventListener} handler - The event handler function.
   * @param {boolean|AddEventListenerOptions} [options] - Optional options for the event listener.
   * @returns {Timer} - The Timer instance.
   */
  on(type, handler, options) {
    this.addEventListener(type, handler, options);
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
    this.removeEventListener(type, handler, options);
    return this;
  }

  /**
   * Starts or resumes the timer.
   * If already running, has no effect.
   */
  start() {
    if (this.#running || this.#elapsed >= this.#duration) {
      return this;
    }
    this.#running = true;
    this.#startTime = Timer.now();
    this.#emit('start');
    requestAnimationFrame(this.#tick);
    return this;
  }

  /**
   * Stops/pauses the timer.
   * Can be resumed later with `start()`.
   *
   * @returns {Timer} - The Timer instance.
   */
  stop() {
    if (!this.#running) {
      return this;
    }
    this.#running = false;
    this.#pauseOffset = this.#elapsed;
    this.#emit('stop');
    return this;
  }

  /**
   * Resets the timer to its initial state.
   *
   * @returns {Timer} - The Timer instance.
   */
  reset() {
    this.#running = false;
    this.#elapsed = this.#initialElapsed;
    this.#pauseOffset = this.#initialElapsed;
    this.#startTime = 0;
    this.#emit('reset');
    return this;
  }

  /**
   * Returns the remaining and elapsed time in milliseconds.
   *
   * @returns {{remaining: number, elapsed: number}} - An object literal that contains the remaining and the elapsed time in milliseconds.
   */
  time() {
    return {
      elapsed: this.#elapsed,
      remaining: this.remaining
    };
  }

  /**
   * Gets the elapsed time in milliseconds.
   *
   * @type {number}
   */
  get elapsed() {
    return this.#elapsed;
  }

  /**
   * Gets the remaining time in milliseconds.
   *
   * @type {number}
   */
  get remaining() {
    return Math.max(0, this.#duration - this.#elapsed);
  }

  /**
   * Returns whether the timer is currently running.
   *
   * @type {boolean} - `true` if the timer is running, `false` otherwise.
   */
  get running() {
    return this.#running;
  }

  /**
   * Get high-resolution timestamp.
   * Uses `performance.now()` when available for sub-millisecond precision.
   *
   * @returns {number} - The current timestamp in milliseconds.
   */
  static now() {
    return 'performance' in window ? performance.now() : Date.now();
  }
}
