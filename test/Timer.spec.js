import Timer from '../src/index';

let timer, elapsed, remaining;
const onTimerRunning = instance => ({ elapsed, remaining } = instance.time());

beforeEach(() => {
  elapsed = remaining = 0;
  timer && timer.stop();
  timer = new Timer(200, onTimerRunning);
});

describe('Timer', () => {
  it('initializes a timer', () => {
    expect(timer instanceof Timer).toBe(true);
  });

  it('initializes a timer with no duration or using a negative number', done => {
    const t1 = new Timer(onTimerRunning);
    const t2 = new Timer(-1000, onTimerRunning);

    t1.start();
    t2.start();

    setTimeout(() => {
      expect(t1.time().remaining).toBe(0);
      expect(t1.time().elapsed).toBeGreaterThan(0);

      expect(t2.time().remaining).toBe(0);
      expect(t2.time().elapsed).toBeGreaterThan(0);

      t1.stop();
      t2.stop();
      done();
    }, 200);
  });

  it('starts the timer without reset', () => {
    timer.start();
    expect(timer._started).toBe(true);
  });

  it('starts the timer and then resets', done => {
    timer.start(true);
    expect(timer._started).toBe(true);

    setTimeout(() => {
      expect(timer._started).toBe(false);
      done();
    }, 500);
  });

  it('stops the timer', () => {
    timer.start();
    expect(timer._started).toBe(true);

    timer.stop();
    expect(timer._started).toBe(false);
  });

  it('resets the timer without stop', () => {
    timer.start();
    expect(timer._started).toBe(true);

    timer.reset();
    expect(timer._started).toBe(true);
  });

  it('resets the timer and then stops', () => {
    timer.start();
    expect(timer._started).toBe(true);

    timer.reset(true);
    expect(timer._started).toBe(false);
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
