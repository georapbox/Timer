function now() {
  return window && window.performance ? window.performance.now() : Date.now;
}

function tick(instance) {
  if (instance._started === false) {
    return;
  }

  instance._time = instance._time + now() - instance._now;
  instance.stop().start();

  if (typeof instance._callback === 'function') {
    instance._callback(instance);
  }
}

class Timer {
  /**
   * Timer constructor
   *
   * @constructor Timer
   * @param {Number} elapsedTime The time that has elapsed in milliseconds. If negative number provided, it will become `0`. If a number greater than `duration` is provided, it will become equal to `duration`.
   * @param {Number} duration The timer's duration in milliseconds. If negative number provided, it will become `0`.
   * @param {Function} [callback] Function to be executed while timer is running. The `Timer` instance is passed by as parameter.
   * @throws {TypeError} If `duration` is not a number or `NaN`.
   * @throws {TypeError} If `elapsedTime` is not a number or `NaN`.
   */
  constructor(elapsedTime, duration, callback) {
    if (typeof elapsedTime !== 'number' || Number.isNaN(elapsedTime)) {
      throw new TypeError('Expected a number for "elapsedTime"');
    }

    if (typeof duration !== 'number' || Number.isNaN(duration)) {
      throw new TypeError('Expected a number for "duration"');
    }

    this._started = false;
    this._now = 0;
    this._elapsedTime = elapsedTime;
    this._duration = duration;
    this._callback = callback;

    if (this._duration < 0) {
      this._duration = 0;
    }

    if (this._elapsedTime > this._duration) {
      this._elapsedTime = this._duration;
    }

    if (this._elapsedTime < 0) {
      this._elapsedTime = 0;
    }

    this._time = this._elapsedTime;
  }

  /**
   * Get the remaining and elapsed time.
   * If no duration is specified during initialization, the remaining time will always be 0.
   *
   * @memberof Timer
   * @this {Timer}
   * @returns {Object} An object that contains the remaining and the elapsed time in milliseconds.
   */
  time() {
    return {
      remaining: Math.max(0, this._duration - this._time),
      elapsed: this._time
    };
  }

  /**
   * Start the timer.
   * If the timer instance has been already started, the timer will just resume.
   *
   * @memberof Timer
   * @this {Timer}
   * @param {Boolean} [shouldReset] If set to true, the timer will reset to initial specified duration.
   * @returns {Timer} The Timer instance.
   */
  start(shouldReset) {
    if (shouldReset) {
      this.reset(true);
    }

    if (this._started || this._duration >= 0 && this._time >= this._duration) {
      return this;
    }

    this._started = true;
    this._now = now();
    window.requestAnimationFrame(tick.bind(this, this));
    return this;
  }

  /**
   * Stop/Pause the timer.
   *
   * @memberof Timer
   * @this {Timer}
   * @returns {Timer} The Timer instance.
   */
  stop() {
    this._started = false;
    return this;
  }

  /**
   * Resets the timer to initial specified duration.
   *
   * @memberof Timer
   * @this {Timer}
   * @param {Boolean} [shouldStop] If set to true, the timer will be forced to stop; otherwise will reset and continue running.
   * @returns {Timer} The Timer instance.
   */
  reset(shouldStop) {
    if (shouldStop) {
      this.stop();
    }

    this._time = this._elapsedTime;
    return this;
  }

  /**
   * Check (at any time) if the timer is running or not.
   *
   * @memberof Timer
   * @this {Timer}
   * @returns {Boolean} True if the timer is running; otherwise false.
   */
  isRunning() {
    return this._started;
  }
}

export default Timer;
