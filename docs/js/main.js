const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/timer.js' : '../lib/timer.js';

const { Timer } = await import(componentUrl);

const formEl = document.getElementById('form');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const elapsedEl = document.getElementById('elapsed-placeholder');
const remainingEl = document.getElementById('remaining-placeholder');
const progressEl = document.querySelector('progress');

let timer;

makeTimer({
  elapsed: Number(formEl.elapsed.value) || 0,
  duration: Number(formEl.duration.value) || 0
});

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  const elapsed = Math.max(0, Number(formEl.elapsed.value) || 0);
  const duration = Math.max(0, Number(formEl.duration.value) || 0);
  makeTimer({ elapsed, duration });
});
startBtn.addEventListener('click', () => timer.start());
stopBtn.addEventListener('click', () => timer.stop());
resetBtn.addEventListener('click', () => (timer.reset(), render(timer)));

function render(timer) {
  const { remaining, elapsed } = timer.time();
  elapsedEl.textContent = elapsed.toFixed(2);
  remainingEl.textContent = remaining.toFixed(2);
  progressEl.max = elapsed + remaining;
  progressEl.value = elapsed;
}

function makeTimer({ elapsed, duration }) {
  if (timer) {
    timer
      .off('start', onStart)
      .off('tick', onTick)
      .off('stop', onStop)
      .off('reset', onReset)
      .off('finish', onFinish)
      .stop();
  }

  timer = new Timer({ elapsed, duration })
    .on('start', onStart)
    .on('tick', onTick)
    .on('stop', onStop)
    .on('reset', onReset)
    .on('finish', onFinish);

  render(timer);

  return timer;
}

function onStart(evt) {
  console.log('Timer started', evt.currentTarget.time());
}

function onTick(evt) {
  render(evt.currentTarget);
}

function onStop(evt) {
  console.log('Timer stopped', evt.currentTarget.time());
}

function onReset(evt) {
  console.log('Timer reset', evt.currentTarget.time());
}

function onFinish(evt) {
  console.log('Timer finished', evt.currentTarget.time());
  progressEl.value = progressEl.max;
}
