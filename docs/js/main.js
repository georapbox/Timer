const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/timer.js' : '../lib/timer.js';

const { Timer } = await import(componentUrl);

const $form = document.getElementById('form');
const $result = document.getElementById('result');
const $start = document.getElementById('start');
const $stop = document.getElementById('stop');
const $reset = document.getElementById('reset');

const elapsedTime = Number($form.elapsedTime.value) || 0;
const duration = Number($form.duration.value) || 0;

const renderResult = (el, timer) => {
  const { elapsed, remaining } = timer.time();
  el.innerHTML = `Elapsed (ms): <code>${elapsed}</code><br/>Remaining (ms): <code>${remaining}</code>`;
};

const onTimerRunning = timer => {
  renderResult($result, timer);
};

let t = new Timer(elapsedTime, duration, onTimerRunning);

renderResult($result, t);

$form.addEventListener('submit', evt => {
  evt.preventDefault();

  const elapsedTime = Number($form.elapsedTime.value) || 0;
  const duration = Number($form.duration.value) || 0;

  t.reset();
  t = new Timer(elapsedTime, duration, onTimerRunning);

  renderResult($result, t);
});

$start.addEventListener('click', () => {
  t.start();
});

$stop.addEventListener('click', () => {
  t.stop();
});

$reset.addEventListener('click', () => {
  t.reset();
  renderResult($result, t);
});
