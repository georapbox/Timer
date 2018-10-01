import Timer from '../src/index';
import chai from 'chai';
import { JSDOM } from 'jsdom';

const { assert } = chai;

let timer, elapsed, remaining;
const onTimerRunning = instance => ({ elapsed, remaining } = instance.time());

window = new JSDOM(``, { pretendToBeVisual: true }).window;

beforeEach(() => {
  elapsed = remaining = 0;
  timer && timer.stop();
  timer = new Timer(1000, onTimerRunning);
});

describe('Timer', () => {
  it('initializes a timer', () => {
    assert.instanceOf(timer, Timer, 'timer is  an intance of Timer');
  });

  it('starts the timer without reset', () => {
    timer.start();
    assert.isTrue(timer._started);
  });

  it('starts the timer and then resets', done => {
    timer.start(true);
    assert.isTrue(timer._started);

    setTimeout(() => {
      assert.isFalse(timer._started);
      done();
    }, 1200);
  });

  it('stops the timer', () => {
    timer.start();
    assert.isTrue(timer._started);

    timer.stop();
    assert.isFalse(timer._started);
  });

  it('resets the timer without stop', () => {
    timer.start();
    assert.isTrue(timer._started);

    timer.reset();
    assert.isTrue(timer._started);
  });

  it('resets the timer and then stops', () => {
    timer.start();
    assert.isTrue(timer._started);

    timer.reset(true);
    assert.isFalse(timer._started);
  });

  it('executes the callback function', done => {
    timer.start();
    assert.isTrue(timer._started);

    setTimeout(() => {
      assert.isAbove(elapsed, 0);
      done();
    }, 1200);
  });

  it('gets the remaining and elapsed time', done => {
    timer.start();

    setTimeout(() => {
      assert.isAbove(elapsed, 0);
      assert.isBelow(remaining, 1000);
      done();
    }, 500);
  });

  it('check if timer is running', done => {
    timer.start();
    assert.isTrue(timer.isRunning());

    setTimeout(() => {
      assert.isFalse(timer.isRunning());
      done();
    }, 1200);
  });
});
