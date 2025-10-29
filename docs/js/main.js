const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/timer.js' : '../lib/timer.js';

const { Timer } = await import(componentUrl);

const $form = document.getElementById('form');
const $start = document.getElementById('start');
const $stop = document.getElementById('stop');
const $reset = document.getElementById('reset');
const $resElapsed = document.getElementById('resElapsed');
const $resRemaining = document.getElementById('resRemaining');
const $progress = document.querySelector('progress');

const elapsed = Number($form.elapsed.value) || 0;
const duration = Number($form.duration.value) || 0;

const renderResult = ({ remaining, elapsed }) => {
  $resElapsed.textContent = elapsed;
  $resRemaining.textContent = remaining;
  $progress.max = elapsed + remaining;
  $progress.value = elapsed;
};

const onTimerStart = evt => {
  console.log('Timer started', evt.currentTarget.time());
};

const onTimerStop = evt => {
  console.log('Timer stopped', evt.currentTarget.time());
};

const onTimerReset = evt => {
  console.log('Timer reset', evt.currentTarget.time());
};

const onTimerFinish = evt => {
  console.log('Timer finished', evt.currentTarget.time());
};

const onTimerTick = evt => {
  const { remaining, elapsed } = evt.currentTarget.time();
  renderResult({ remaining, elapsed });
};

let t = new Timer({ elapsed, duration })
  .on('tick', onTimerTick)
  .on('start', onTimerStart)
  .on('stop', onTimerStop)
  .on('reset', onTimerReset)
  .on('finish', onTimerFinish);

renderResult(t.time());

$form.addEventListener('submit', evt => {
  evt.preventDefault();

  const elapsed = Number($form.elapsed.value) || 0;
  const duration = Number($form.duration.value) || 0;

  t.stop()
    .off('tick', onTimerTick)
    .off('start', onTimerStart)
    .off('stop', onTimerStop)
    .off('reset', onTimerReset)
    .off('finish', onTimerFinish);

  t = new Timer({ elapsed, duration })
    .on('tick', onTimerTick)
    .on('start', onTimerStart)
    .on('stop', onTimerStop)
    .on('reset', onTimerReset)
    .on('finish', onTimerFinish);

  renderResult(t.time());
});

$start.addEventListener('click', () => {
  t.start();
});

$stop.addEventListener('click', () => {
  t.stop();
});

$reset.addEventListener('click', () => {
  t.reset();
  renderResult(t.time());
});
