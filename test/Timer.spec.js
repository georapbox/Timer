import Timer from '../src/index';
import chai from 'chai';

const { assert } = chai;

let timer;
let result = 0;

beforeEach(async () => {
  window.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
  };

  timer = new Timer(1000, () => {});
});

describe('Timer Tests', () => {
  it('initializes a timer', () => {
    assert.ok(timer);
  });

  it('starts the timer without reset', async () => {
    await timer.start();
    assert.ok(timer._started);
  });

  it('starts the timer and then resets', async () => {
    await timer.start(true);
    assert.ok(timer._started);

    setTimeout(() => {
      assert.ok(!timer._started);
    }, 1100);
  });

  it('stops the timer', async () => {
    await timer.start();
    assert.ok(timer._started);

    timer.stop();
    assert.ok(!timer._started);
  });

  it('resets the timer without stop', async () => {
    await timer.start();
    assert.ok(timer._started);

    timer.reset();
    assert.ok(timer._started);
  });

  it('resets the timer and then stops', async () => {
    await timer.start();
    assert.ok(timer._started);

    timer.reset(true);
    assert.ok(!timer._started);
  });

  it('executes the callback function', async () => {
    await timer.start();
    assert.ok(timer._started);

    setTimeout(() => {
      assert.equal(result, 1);
    }, 1100);
  });
});
