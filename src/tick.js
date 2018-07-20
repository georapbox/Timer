import now from './now';

export default function tick(instance) {
  if (instance._started === false) {
    return;
  }

  instance._time = instance._time + now() - instance._now;
  instance.stop().start();
  instance._callback && instance._callback(instance);
}
