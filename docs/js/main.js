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

const renderResult = (el, { remaining, elapsed }) => {
  el.innerHTML = `Elapsed (ms): <code>${elapsed}</code><br/>Remaining (ms): <code>${remaining}</code>`;
};

const onStart = evt => {
  console.log('Timer started', evt.detail);
};

const onStop = evt => {
  console.log('Timer stopped', evt.detail);
};

const onReset = evt => {
  console.log('Timer reset', evt.detail);
};

const onFinish = evt => {
  console.log('Timer finished', evt.detail);
};

const onTick = evt => {
  const { remaining, elapsed } = evt.detail;
  renderResult($result, { remaining, elapsed });
};

let t = new Timer(elapsedTime, duration)
  .on('tick', onTick)
  .on('start', onStart)
  .on('stop', onStop)
  .on('reset', onReset)
  .on('finish', onFinish);

renderResult($result, t.time());

$form.addEventListener('submit', evt => {
  evt.preventDefault();

  const elapsedTime = Number($form.elapsedTime.value) || 0;
  const duration = Number($form.duration.value) || 0;

  t.reset().off('tick', onTick).off('start', onStart).off('stop', onStop).off('reset', onReset).off('finish', onFinish);

  t = new Timer(elapsedTime, duration)
    .on('tick', onTick)
    .on('start', onStart)
    .on('stop', onStop)
    .on('reset', onReset)
    .on('finish', onFinish);

  renderResult($result, t.time());
});

$start.addEventListener('click', () => {
  t.start();
});

$stop.addEventListener('click', () => {
  t.stop();
});

$reset.addEventListener('click', () => {
  t.reset();
  renderResult($result, t.time());
});
