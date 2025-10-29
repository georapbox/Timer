/*!
 * @georapbox/timer
 * A lightweight, drift-free timer library built for the browser — precise, pause-resumable, and easy to use.
 *
 * @version 3.0.0
 * @homepage https://github.com/georapbox/Timer#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var h=class r extends EventTarget{#s=!1;#i=0;#t=0;#h=0;#r=0;#e=0;constructor(t){super();let s={...{elapsed:0,duration:1/0},...t},{elapsed:e,duration:n}=s;if(typeof e!="number"||Number.isNaN(e))throw new TypeError("elapsed option must be a number");if(typeof n!="number"||Number.isNaN(n))throw new TypeError("duration option must be a number");this.#s=!1,this.#i=Math.max(0,n),this.#t=Math.min(Math.max(0,e),this.#i),this.#h=this.#t,this.#r=0,this.#e=this.#t}#n(t){this.dispatchEvent(new Event(t))}#a=()=>{if(!this.#s)return;let t=r.now()-this.#r+this.#e;this.#t=Math.min(t,this.#i),this.#n("tick"),t<this.#i?requestAnimationFrame(this.#a):(this.#s=!1,this.#e=this.#t,this.#n("finish"))};on(t,i,s){return this.addEventListener(t,i,s),this}off(t,i,s){return this.removeEventListener(t,i,s),this}start(){return this.#s||this.#t>=this.#i?this:(this.#s=!0,this.#r=r.now(),this.#n("start"),requestAnimationFrame(this.#a),this)}stop(){return this.#s?(this.#s=!1,this.#e=this.#t,this.#n("stop"),this):this}reset(){return this.#s=!1,this.#t=this.#h,this.#e=this.#h,this.#r=0,this.#n("reset"),this}time(){return{elapsed:this.#t,remaining:this.remaining}}get elapsed(){return this.#t}get remaining(){return Math.max(0,this.#i-this.#t)}get running(){return this.#s}static now(){return"performance"in window?performance.now():Date.now()}};export{h as Timer};
