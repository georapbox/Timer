/*!
 * @georapbox/timer
 * Minimal JavaScript library to create and manage timers in the browser
 *
 * @version 3.0.0
 * @homepage https://github.com/georapbox/Timer#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var e=class s{static now(){return"performance"in window?performance.now():Date.now()}constructor(t,i,n){if(typeof t!="number"||Number.isNaN(t))throw new TypeError('Expected a number for "elapsedTime"');if(typeof i!="number"||Number.isNaN(i))throw new TypeError('Expected a number for "duration"');this._running=!1,this._duration=Math.max(0,i),this._elapsed=Math.min(Math.max(0,t),this._duration),this._initialElapsed=this._elapsed,this._callback=n||null,this._startTime=0,this._pauseOffset=this._elapsed,this._tick=this._tick.bind(this)}_tick(){if(!this._running)return;let t=s.now()-this._startTime+this._pauseOffset;this._elapsed=Math.min(t,this._duration),typeof this._callback=="function"&&this._callback(this),t<this._duration?requestAnimationFrame(this._tick):this.stop()}start(){return this._running||this._elapsed>=this._duration?this:(this._running=!0,this._startTime=s.now(),requestAnimationFrame(this._tick),this)}stop(){return this._running?(this._running=!1,this._pauseOffset=this._elapsed,this):this}reset(){return this._running=!1,this._elapsed=this._initialElapsed,this._pauseOffset=this._initialElapsed,this._startTime=0,this}time(){return{elapsed:this._elapsed,remaining:Math.max(0,this._duration-this._elapsed)}}isRunning(){return this._running}};export{e as Timer};
