import Timer from 'https://unpkg.com/@georapbox/timer/dist/Timer.esm.min.js';
// import Timer from '../src/index.js';

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

  t.stop();
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
