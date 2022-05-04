function now() {
  return 'performance' in window ? window.performance.now() : Date.now();
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
   * Timer constructor: Creates a new Timer instance.
   *
   * @constructor Timer
   * @param {Number} elapsedTime The time that has elapsed in milliseconds. If a negative number provided, it will become `0`. If a number greater than `duration` is provided, it will become equal to `duration`.
   * @param {Number} duration The timer's duration in milliseconds. If a negative number provided, it will become `0`.
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
   *
   * @memberof Timer
   * @returns {Object} An object literal that contains the remaining and the elapsed time in milliseconds.
   */
  time() {
    return {
      remaining: Math.max(0, this._duration - this._time),
      elapsed: this._time
    };
  }

  /**
   * Starts the timer.
   * If the timer instance has been already started, the timer will just resume.
   *
   * @memberof Timer
   * @returns {Timer} The Timer instance.
   */
  start() {
    if (this._started || this._duration >= 0 && this._time >= this._duration) {
      return this;
    }

    this._started = true;
    this._now = now();
    window.requestAnimationFrame(tick.bind(this, this));
    return this;
  }

  /**
   * Stops/Pauses the timer.
   *
   * @memberof Timer
   * @returns {Timer} The Timer instance.
   */
  stop() {
    this._started = false;
    return this;
  }

  /**
   * Resets the timer to its initial state.
   *
   * @memberof Timer
   * @returns {Timer} The Timer instance.
   */
  reset() {
    this._started = false;
    this._time = this._elapsedTime;
    this._now = 0;
    return this;
  }

  /**
   * Checks (at any time) if the timer is running or not.
   *
   * @memberof Timer
   * @returns {Boolean} `true` if the timer is running; otherwise `false`.
   */
  isRunning() {
    return this._started;
  }
}

export default Timer;
