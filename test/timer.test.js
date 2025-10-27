import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Timer } from '../src/timer.js';

describe('Timer (public API, no timing precision assertions)', () => {
  /** @type {sinon.SinonFakeTimers} */
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers({
      now: 0,
      toFake: [
        'Date',
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'performance'
      ]
    });
  });

  afterEach(() => {
    clock.restore();
  });

  it('throws if elapsedTime is not a number', () => {
    expect(() => new Timer('100', 1000, () => {})).to.throw(TypeError, 'Expected a number for "elapsedTime"');
    expect(() => new Timer(NaN, 1000, () => {})).to.throw(TypeError, 'Expected a number for "elapsedTime"');
  });

  it('throws if duration is not a number', () => {
    expect(() => new Timer(0, '1000', () => {})).to.throw(TypeError, 'Expected a number for "duration"');
    expect(() => new Timer(0, NaN, () => {})).to.throw(TypeError, 'Expected a number for "duration"');
  });

  it('is not running by default and reports full remaining time', () => {
    const t = new Timer(0, 1000, () => {});
    expect(t.isRunning()).to.be.false;
    expect(t.time()).to.deep.equal({ elapsed: 0, remaining: 1000 });
  });

  it('if already started, start() is a no-op', () => {
    const t = new Timer(0, 1000, () => {});
    t.start();
    const firstState = t.isRunning();
    t.start();
    const secondState = t.isRunning();
    expect(firstState).to.be.true;
    expect(secondState).to.be.true;
  });

  it('time() advances while running and does not advance while stopped', () => {
    const t = new Timer(0, 1000, () => {});
    t.start();

    // drive a couple frames
    clock.tick(50);
    const a = t.time().elapsed;

    // still running -> elapsed must be > 0
    expect(a).to.be.greaterThan(0);

    t.stop();
    const stoppedElapsed = t.time().elapsed;

    // advance a lot; since stopped, elapsed should not change
    clock.tick(500);
    const afterWait = t.time().elapsed;
    expect(t.isRunning()).to.be.false;
    expect(afterWait).to.equal(stoppedElapsed);
  });

  it('if already stopped, stop() is a no-op', () => {
    const t = new Timer(0, 1000, () => {});
    t.start();
    t.stop();
    const firstState = t.isRunning();
    expect(firstState).to.be.false;
    t.stop();
    const secondState = t.isRunning();
    expect(secondState).to.be.false;
  });

  it('stops automatically once duration passes and clamps elapsed to duration', () => {
    const t = new Timer(0, 200, () => {});
    t.start();

    // advance well beyond duration
    clock.tick(1000);

    const { elapsed, remaining } = t.time();
    expect(t.isRunning()).to.be.false;
    expect(elapsed).to.equal(200);
    expect(remaining).to.equal(0);
  });

  it('does not restart after completion (start() is ignored once finished)', () => {
    const t = new Timer(0, 100, () => {});
    t.start();
    clock.tick(1000); // finish

    expect(t.isRunning()).to.be.false;
    expect(t.time()).to.deep.equal({ elapsed: 100, remaining: 0 });

    t.start(); // should be ignored
    expect(t.isRunning()).to.be.false;
    expect(t.time()).to.deep.equal({ elapsed: 100, remaining: 0 });
  });

  it('reset() returns to the initial elapsed and stops the timer', () => {
    const t = new Timer(200, 1000, () => {}); // initial elapsed 200
    t.start();
    clock.tick(300); // run a bit
    t.reset();

    expect(t.isRunning()).to.be.false;
    expect(t.time()).to.deep.equal({ elapsed: 200, remaining: 800 });
  });

  it('pause then resume preserves elapsed and still finishes at duration', () => {
    const t = new Timer(0, 500, () => {});
    t.start();

    clock.tick(150); // some progress
    const beforePause = t.time().elapsed;

    t.stop();
    clock.tick(1000); // while paused, should not change
    expect(t.time().elapsed).to.equal(beforePause);

    t.start();
    clock.tick(1000); // finish

    const { elapsed, remaining } = t.time();
    expect(t.isRunning()).to.be.false;
    expect(elapsed).to.equal(500);
    expect(remaining).to.equal(0);
  });

  it('duration = Infinity: runs indefinitely and remaining stays Infinity', () => {
    const t = new Timer(0, Infinity, () => {});
    t.start();

    clock.tick(10 * 60 * 1000); // advance 10 minutes
    expect(t.isRunning()).to.be.true;

    const { elapsed, remaining } = t.time();
    expect(elapsed).to.be.greaterThan(0);
    expect(remaining).to.equal(Infinity);

    // stop explicitly
    t.stop();
    expect(t.isRunning()).to.be.false;
  });

  it('invokes the callback while running and not after stopped', () => {
    const cb = sinon.spy();
    const t = new Timer(0, 200, cb);
    t.start();

    clock.tick(60); // some frames
    const callsWhileRunning = cb.callCount;
    expect(callsWhileRunning).to.be.greaterThan(0);

    t.stop();
    const callsAtStop = cb.callCount;
    clock.tick(200);
    expect(cb.callCount).to.equal(callsAtStop); // no more calls after stop()
  });
});
