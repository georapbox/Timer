export default function now() {
  return window.performance ? window.performance.now() : Date.now
    ? Date.now() : new Date().getTime();
}
