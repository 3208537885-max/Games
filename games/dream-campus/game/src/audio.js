/* Original procedural score and SFX. Starts only after a user gesture. */
(function(root){
  'use strict';const D=root.DC;
  class AudioSystem{
    constructor(){this.ctx=null;this.master=null;this.settings={volume:.35,music:true};this.last={};this.musicClock=0;this.musicStep=0;this.voices=0;}
    unlock(){try{if(!this.ctx){const C=root.AudioContext||root.webkitAudioContext;if(!C)return;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=this.settings.volume*.3;this.master.connect(this.ctx.destination);}if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});}catch(e){console.warn('Audio unavailable; continuing silently.',e.message);}}
    configure(settings){this.settings=settings;if(this.master&&this.ctx)this.master.gain.setTargetAtTime(settings.volume*.30,this.ctx.currentTime,.04);}
    tone(freq,duration=.12,type='sine',gain=.15,end=null,delay=0){
      if(!this.ctx||this.ctx.state!=='running'||this.voices>36||this.settings.volume<=0)return;
      const t=this.ctx.currentTime+delay,osc=this.ctx.createOscillator(),env=this.ctx.createGain();this.voices++;osc.type=type;osc.frequency.setValueAtTime(freq,t);if(end)osc.frequency.exponentialRampToValueAtTime(Math.max(25,end),t+duration);
      env.gain.setValueAtTime(.001,t);env.gain.linearRampToValueAtTime(gain,t+.012);env.gain.exponentialRampToValueAtTime(.001,t+duration);osc.connect(env);env.connect(this.master);osc.start(t);osc.stop(t+duration+.02);osc.onended=()=>{osc.disconnect();env.disconnect();this.voices=Math.max(0,this.voices-1);};
    }
    play(name,variant=0){
      if(!this.ctx)return;const now=this.ctx.currentTime;const throttle={shoot:.065,water:.07,hit:.055,coin:.045,turret:.09,kill:.05};if(now-(this.last[name]??-10)<(throttle[name]||.02))return;this.last[name]=now;
      switch(name){
        case 'shoot':this.tone(390+variant*38,.065,'triangle',.075,170);break;
        case 'water':this.tone(680,.095,'sine',.11,250);break;
        case 'laser':this.tone(810,.10,'sawtooth',.036,450);break;
        case 'swing':this.tone(230,.13,'triangle',.12,55);break;
        case 'lob':this.tone(190,.16,'sine',.16,440);break;
        case 'turret':this.tone(470,.06,'triangle',.04,300);break;
        case 'hit':this.tone(145,.055,'square',.045,90);break;
        case 'kill':this.tone(210,.11,'triangle',.13,57);break;
        case 'explode':case 'impact':this.tone(94,.32,'triangle',.3,27);this.tone(157,.14,'sawtooth',.06,45);break;
        case 'hurt':this.tone(210,.15,'square',.13,78);break;
        case 'dash':this.tone(750,.15,'sine',.1,140);break;
        case 'coin':this.tone(1047,.08,'sine',.08,1319);break;
        case 'drink':this.tone(420,.2,'sine',.1,720);break;
        case 'swap':this.tone(330,.05,'triangle',.08,550);break;
        case 'charge':this.tone(100,.2,'sawtooth',.06,420);break;
        case 'phase':this.tone(82,.65,'sawtooth',.08,164);this.tone(124,.5,'triangle',.14,248);break;
        case 'skill':[262,392,523].forEach((f,i)=>this.tone(f,.5,'triangle',.16, f*1.5,i*.045));break;
        case 'heal':case 'reward':case 'buy':case 'chest':[523,659,784].forEach((f,i)=>this.tone(f,.25,'sine',.14,null,i*.075));break;
        case 'clear':case 'portal':[392,523,659,784].forEach((f,i)=>this.tone(f,.4,'triangle',.14,null,i*.11));break;
        case 'bossDeath':[131,196,262,330,392,523].forEach((f,i)=>this.tone(f,.6,'triangle',.2,null,i*.13));break;
        case 'wave':this.tone(164,.3,'triangle',.12,220);break;
        case 'door':this.tone(300,.16,'triangle',.09,450);break;
      }
    }
    update(dt,game){
      this.configure(game.meta.settings);if(!this.ctx||this.ctx.state!=='running'||!this.settings.music||game.mode!=='playing')return;this.musicClock-=dt;if(this.musicClock>0)return;
      const boss=!!game.boss;this.musicClock=boss?.25:.34;
      const melody=[0,7,12,14,12,7,3,7,0,7,10,14,10,7,3,-2],base=[130.81,146.83,164.81][game.run.floor],step=this.musicStep++;
      this.tone(base*Math.pow(2,melody[step%16]/12),boss?.17:.26,'triangle',boss?.032:.024);
      if(step%4===0)this.tone(base*.5,.65,'sine',.06);if(boss&&step%2===0)this.tone(65,.09,'triangle',.03,30);
    }
    destroy(){if(this.ctx){this.ctx.close().catch(()=>{});this.ctx=null;}}
  }
  D.AudioSystem=AudioSystem;
})(typeof window!=='undefined'?window:globalThis);
