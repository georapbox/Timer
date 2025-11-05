import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Timer } from '../src/timer.js';

describe('Timer (public API)', () => {
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

  describe('Construction & options validation', () => {
    it('throws if options.elapsed is not a number', () => {
      expect(() => new Timer({ elapsed: '100', duration: 1000 })).to.throw(
        TypeError,
        'elapsed option must be a number'
      );
      expect(() => new Timer({ elapsed: NaN, duration: 1000 })).to.throw(TypeError, 'elapsed option must be a number');
    });

    it('throws if options.duration is not a number', () => {
      expect(() => new Timer({ duration: '1000' })).to.throw(TypeError, 'duration option must be a number');
      expect(() => new Timer({ duration: NaN })).to.throw(TypeError, 'duration option must be a number');
    });

    it('is not running by default and reports full remaining time', () => {
      const t = new Timer({ duration: 1000 });
      expect(t.running).to.be.false;
      expect(t.time()).to.deep.equal({ elapsed: 0, remaining: 1000 });
    });
  });

  describe('Start/Stop behavior', () => {
    it('if already started, start() is a no-op', () => {
      const t = new Timer({ duration: 1000 });
      t.start();
      const firstState = t.running;
      t.start();
      const secondState = t.running;
      expect(firstState).to.be.true;
      expect(secondState).to.be.true;
    });

    it('if already stopped, stop() is a no-op', () => {
      const t = new Timer({ duration: 1000 });
      t.start();
      t.stop();
      const firstState = t.running;
      expect(firstState).to.be.false;
      t.stop();
      const secondState = t.running;
      expect(secondState).to.be.false;
    });

    it('pause then resume preserves elapsed and still finishes at duration', () => {
      const t = new Timer({ duration: 500 });
      t.start();
      clock.tick(150); // some progress
      const beforePause = t.time().elapsed;
      t.stop();
      clock.tick(1000); // while paused, should not change
      expect(t.time().elapsed).to.equal(beforePause);
      t.start();
      clock.tick(1000); // finish
      const { elapsed, remaining } = t.time();
      expect(t.running).to.be.false;
      expect(elapsed).to.equal(500);
      expect(remaining).to.equal(0);
    });

    it('reset() returns to the initial elapsed and stops the timer', () => {
      const t = new Timer({ elapsed: 200, duration: 1000 }); // initial elapsed 200
      t.start();
      clock.tick(300); // run a bit
      t.reset();
      expect(t.running).to.be.false;
      expect(t.time()).to.deep.equal({ elapsed: 200, remaining: 800 });
    });
  });

  describe('Timing & completion', () => {
    it('time() advances while running and does not advance while stopped', () => {
      const t = new Timer({ duration: 1000 });
      t.start();
      clock.tick(50); // drive a couple frames
      const a = t.time().elapsed;
      expect(a).to.be.greaterThan(0); // still running -> elapsed must be > 0
      t.stop();
      const stoppedElapsed = t.time().elapsed;
      clock.tick(500); // advance a lot; since stopped, elapsed should not change
      const afterWait = t.time().elapsed;
      expect(t.running).to.be.false;
      expect(afterWait).to.equal(stoppedElapsed);
    });

    it('stops automatically once duration passes and clamps elapsed to duration', () => {
      const t = new Timer({ duration: 200 });
      t.start();
      clock.tick(1000); // advance well beyond duration
      const { elapsed, remaining } = t.time();
      expect(t.running).to.be.false;
      expect(elapsed).to.equal(200);
      expect(remaining).to.equal(0);
    });

    it('does not restart after completion (start() is ignored once finished)', () => {
      const t = new Timer({ duration: 100 });
      t.start();
      clock.tick(1000); // finish
      expect(t.running).to.be.false;
      expect(t.time()).to.deep.equal({ elapsed: 100, remaining: 0 });
      t.start(); // should be ignored
      expect(t.running).to.be.false;
      expect(t.time()).to.deep.equal({ elapsed: 100, remaining: 0 });
    });
  });

  describe('Events', () => {
    it('triggers tick events while running and stops triggering after stop()', () => {
      const cb = sinon.spy();
      const t = new Timer({ duration: 200 });
      t.on('tick', cb);
      t.start();
      clock.tick(60); // some frames
      const callsWhileRunning = cb.callCount;
      expect(callsWhileRunning).to.be.greaterThan(0);
      t.stop();
      const callsAtStop = cb.callCount;
      clock.tick(200);
      expect(cb.callCount).to.equal(callsAtStop); // no more calls after stop()
    });

    it('triggers finish event once upon completion', () => {
      const cb = sinon.spy();
      const t = new Timer({ duration: 100 });
      t.on('finish', cb);
      t.start();
      clock.tick(500); // advance well beyond duration
      expect(cb).to.have.been.calledOnce;
    });

    it('triggers start, stop, reset events appropriately', () => {
      const startCb = sinon.spy();
      const stopCb = sinon.spy();
      const resetCb = sinon.spy();
      const t = new Timer({ duration: 300 });
      t.on('start', startCb);
      t.on('stop', stopCb);
      t.on('reset', resetCb);
      t.start();
      expect(startCb).to.have.been.calledOnce;
      t.stop();
      expect(stopCb).to.have.been.calledOnce;
      t.reset();
      expect(resetCb).to.have.been.calledOnce;
    });

    it('allows removing event listeners with off()', () => {
      const cb = sinon.spy();
      const t = new Timer({ duration: 100 });
      t.on('tick', cb);
      t.start();
      clock.tick(50);
      const callsWhileRegistered = cb.callCount;
      expect(callsWhileRegistered).to.be.greaterThan(0);
      t.off('tick', cb);
      const callsAtOff = cb.callCount;
      clock.tick(100);
      expect(cb.callCount).to.equal(callsAtOff); // no more calls after off()
    });
  });

  describe('Accessors & static API', () => {
    it('getter elapsed returns correct elapsed time', () => {
      const t = new Timer({ duration: 100 });
      expect(t.elapsed).to.equal(0);
      t.start();
      clock.tick(200); // advance beyond duration
      expect(t.elapsed).to.equal(100);
    });

    it('getter remaining returns correct remaining time', () => {
      const t = new Timer({ duration: 100 });
      expect(t.remaining).to.equal(100);
      t.start();
      clock.tick(40);
      expect(t.remaining).to.be.lessThan(100);
      clock.tick(200); // advance beyond duration
      expect(t.remaining).to.equal(0);
    });

    it('Timer.now() returns current time in milliseconds', () => {
      const t0 = Timer.now();
      clock.tick(123);
      const t1 = Timer.now();
      expect(t1 - t0).to.equal(123);
    });
  });
});
