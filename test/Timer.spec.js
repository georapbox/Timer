import Timer from '../src/index';
// import chai from 'chai';
// import { JSDOM } from 'jsdom';

// const { assert } = chai;

let timer, elapsed, remaining;
const onTimerRunning = instance => ({ elapsed, remaining } = instance.time());

// window = new JSDOM(``, { pretendToBeVisual: true }).window;

beforeEach(() => {
  elapsed = remaining = 0;
  timer && timer.stop();
  timer = new Timer(200, onTimerRunning);
});

describe('Timer', () => {
  it('initializes a timer', () => {
    expect(timer instanceof Timer).toBe(true);
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
