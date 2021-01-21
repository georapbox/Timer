# CHANGELOG

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
