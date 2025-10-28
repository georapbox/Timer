# CHANGELOG

## v3.0.0 (2025-10-XX)

### Breaking changes

- The constructor signature has changed from `new Timer(elapsedTime, duration, [callback])` to `new Timer(elapsedTime, duration)`.  
  The `callback` parameter has been removed.  
  Use the `tick` event to handle per-frame updates instead and the `finish` event to handle timer completion.  
  ```js
  const timer = new Timer(0, 5000) // 5 seconds
    .on('tick', (e) => {
      const { elapsed, remaining } = e.detail;
      console.log(`Elapsed: ${elapsed}ms, Remaining: ${remaining}ms`);
    })
    .on('finish', () => {
      console.log('Timer finished!');
    });
  ```
  
- The library is now **ES Modules–only**.  
  It is no longer distributed in CommonJS or UMD formats. Ensure your environment (browser, bundler, or Node ≥ 12) supports ESM imports.
- Removed default export.  
  The library must now be imported using **named imports**:  
  ```js
  import { Timer } from '@georapbox/timer';
  ```

### Changed

- **Refactored `Timer` implementation** for improved accuracy and clarity:
  - Event-driven architecture — removed callback parameter in favor of using `tick` and `finish` events for all updates. Added other events like `start`, `stop`, and `reset`.
  - Replaced incremental, per-frame time accumulation with a **drift-free, deadline-based model** using absolute timestamps (`performance.now()`).
  - Replaced internal `_started` flag with clearer `_running` naming.
  - Moved `now()` helper into a **static class method** (`Timer.now()`), making the class fully self-contained.
  - Simplified RAF loop: `_tick()` now schedules itself directly and auto-stops when duration elapses.

### Added

- The package now includes TypeScript type declarations (`.d.ts`), allowing IntelliSense and type safety when using the library in TypeScript projects.

### Fixed

- Eliminated **cumulative drift** over long durations (e.g., multi-minute or hour-long timers) caused by per-frame rounding.
- Timer now consistently **auto-stops** at exact `duration` and never overshoots.

## v2.0.0 (2022-05-04)

### Breaking changes

- The identity of the constructor has changed from `new Timer([duration], [callback])` to `new Timer(elapsedTime, duration, [callback])` in order to support initialising the Timer with elapsed time. 
- `elapsedTime` and `duration` parameters are both required and should be numbers other than `NaN`, otherwise it throws `TypeError`.
- If the `duration` is a negative number, it will become `0`.
- `start` method no longer accepts `shouldReset` argument. If you need to reset before starting, you can always chain methods, eg `reset().start()`.
- `reset` method no longer accepts `shouldStop` argument. It now forces the timer to stop by default.

> Documentation for v1.2.0 can be found [here](https://www.npmjs.com/package/@georapbox/timer/v/1.2.0).

## v1.2.0 (2021-01-21)

- Count up if user provides a negative number for `duration`.
- Fix wrong behavior if both `duration` and `callback` not provided.
- Export library in ESM and ComonJS formats.
- Replace Mocha with Jest for testing.
- Replace Webpack with rollup to bundle the library.

## v1.1.2

- Update `npm-run-all` to latest version to protect against `flatmap-stream` malicious dependency (https://github.com/mysticatea/npm-run-all/issues/153)

## v1.1.1

- Fix return value for `isRunning()` method in documentation.

## v1.1.0

- Fix tests integrity.
- Add `isRunning()` method to check if the timer is running at any time.

## v1.0.0

- Initial release
