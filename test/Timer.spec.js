import Timer from '../src/index';

let timer, elapsed, remaining;
const onTimerRunning = instance => ({ elapsed, remaining } = instance.time());

describe('Timer (normal flow)', () => {
  beforeEach(() => {
    elapsed = remaining = 0;
    timer && timer.stop();
    timer = new Timer(100, 200, onTimerRunning);
  });

  it('initializes a timer', () => {
    expect(timer instanceof Timer).toBe(true);
  });

  it('test elapsedTime', () => {
    expect(timer._elapsedTime).toBe(100);
  });

  it('test duration', () => {
    expect(timer._duration).toBe(200);
  });

  it('starts the timer', () => {
    timer.start();
    expect(timer._started).toBe(true);
  });

  it('stops the timer', () => {
    timer.start();
    expect(timer._started).toBe(true);

    timer.stop();
    expect(timer._started).toBe(false);
  });

  it('resets the timer', () => {
    timer.start();
    expect(timer._started).toBe(true);

    timer.reset();
    expect(timer._started).toBe(false);
    expect(timer._time).toBe(100);
    expect(timer._now).toBe(0);
  });

  it('executes the callback function', done => {
    timer.start();
    expect(timer._started).toBe(true);

    setTimeout(() => {
      expect(elapsed).toBeGreaterThan(0);
      done();
    }, 500);
  });

  it('gets the remaining and elapsed time', done => {
    timer.start();

    setTimeout(() => {
      expect(elapsed).toBeGreaterThan(0);
      expect(remaining).toBeLessThan(1000);
      done();
    }, 500);
  });

  it('check if timer is running', done => {
    timer.start();
    expect(timer.isRunning()).toBe(true);

    setTimeout(() => {
      expect(timer.isRunning()).toBe(false);
      done();
    }, 500);
  });
});

describe('Timer (edge cases)', () => {
  it ('throws if elapsedTime is not a number', () => {
    expect(() => {
      return new Timer('0', 200);
    }).toThrow(new TypeError('Expected a number for "elapsedTime"'));
  });

  it ('throws if elapsedTime is NaN', () => {
    expect(() => {
      return new Timer(NaN, 200);
    }).toThrow(new TypeError('Expected a number for "elapsedTime"'));
  });

  it ('throws if duration is not a number', () => {
    expect(() => {
      return new Timer(0, '200');
    }).toThrow(new TypeError('Expected a number for "duration"'));
  });

  it ('throws if duration is NaN', () => {
    expect(() => {
      return new Timer(0, NaN);
    }).toThrow(new TypeError('Expected a number for "duration"'));
  });

  it('duration becomes 0 if negative', () => {
    const t = new Timer(0, -1000);

    expect(t._duration).toBe(0);
  });

  it('elapsedTime becomes 0 if negative', () => {
    const t = new Timer(-1000, 1000);

    expect(t._elapsedTime).toBe(0);
  });

  it('elapsedTime is greater than duration', () => {
    const t = new Timer(1000, 0);

    expect(t._elapsedTime).toBe(0);
  });
});
