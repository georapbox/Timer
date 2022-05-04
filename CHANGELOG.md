# CHANGELOG

## v2.0.0 - 2022-05-04

### Breaking changes

- The identity of the constructor has changed from `new Timer([duration], [callback])` to `new Timer(elapsedTime, duration, [callback])` in order to support initialising the Timer with elapsed time. 
- `elapsedTime` and `duration` parameters are both required and should be numbers other than `NaN`, otherwise it throws `TypeError`.
- If the `duration` is a negative number, it will become `0`.
- `start` method no longer accepts `shouldReset` argument. If you need to reset before starting, you can always chain methods, eg `reset().start()`.
- `reset` method no longer accepts `shouldStop` argument. It now forces the timer to stop by default.

> Documentation for v1.2.0 can be found [here](https://www.npmjs.com/package/@georapbox/timer/v/1.2.0).

## v1.2.0 - 2021-01-21
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
