/* Browser bootstrap, input, lifecycle and the public integration facade. */
(function(){
  'use strict';const D=window.DC,C=window.DREAM_CAMPUS_CONFIG||{};
  const audio=new D.AudioSystem(),storage=new D.Storage(C.storagePrefix||'dream-campus-v1');
  const game=new D.Game({storage,sound:audio}),ui=new D.UI(game);game.ui=ui;
  const canvas=document.getElementById('surface'),arena=document.getElementById('arena'),renderer=new D.Renderer(canvas,game);
  const input={mx:0,my:0,aimX:D.W*.72,aimY:D.H*.5,fire:false,autoAim:false,swap:null},keys=new Set();game.input=input;
  const params=new URLSearchParams(location.search);if(params.has('seed'))document.getElementById('seed').value=params.get('seed').slice(0,40);
  const debug=!!C.debug||params.get('debug')==='1';let destroyed=false,raf=null,last=null,accumulator=0,hudClock=0,mouseDown=false;
  const touch={move:{x:0,y:0},aim:{x:0,y:0},aiming:false};
  // 只把真正的手机/平板当作触控端，避免带触摸屏的桌面电脑误显示手机控件。
  const mobileDevice=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||
    (window.matchMedia('(pointer: coarse)').matches&&navigator.maxTouchPoints>0&&Math.max(screen.width,screen.height)<=1024);
  document.documentElement.dataset.controlMode=mobileDevice?'touch':'desktop';
  const handlers=[];const listen=(target,name,fn,options)=>{target.addEventListener(name,fn,options);handlers.push(()=>target.removeEventListener(name,fn,options));};
  function resetInput(){keys.clear();mouseDown=false;input.fire=false;input.mx=0;input.my=0;input.dash=false;input.skill=false;input.drink=false;input.interact=false;input.swap=null;touch.move={x:0,y:0};touch.aim={x:0,y:0};touch.aiming=false;document.querySelectorAll('.joystick i').forEach(el=>el.style.transform='');}
  function coordinates(e){const rect=canvas.getBoundingClientRect();return {x:(e.clientX-rect.left)/rect.width*D.W,y:(e.clientY-rect.top)/rect.height*D.H};}
  listen(canvas,'pointerdown',e=>{if(mobileDevice||e.pointerType==='touch')return;if(e.button===0){mouseDown=true;input.fire=true;audio.unlock();canvas.focus({preventScroll:true});const p=coordinates(e);input.aimX=p.x;input.aimY=p.y;}});
  listen(window,'pointerup',e=>{if(!mobileDevice&&e.pointerType!=='touch'&&e.button===0){mouseDown=false;input.fire=false;}});
  listen(window,'pointercancel',()=>{if(!mobileDevice){mouseDown=false;input.fire=false;}});
  listen(canvas,'pointermove',e=>{if(mobileDevice||e.pointerType==='touch')return;const p=coordinates(e);input.aimX=p.x;input.aimY=p.y;});
  listen(canvas,'contextmenu',e=>e.preventDefault());
  listen(canvas,'wheel',e=>{if(game.mode==='playing'){e.preventDefault();input.swap='next';}},{passive:false});
  listen(window,'keydown',e=>{
    if(mobileDevice)return;
    // Trap focus inside modal dialogs; never intercept typing in form controls.
    if(e.code==='Tab'&&!ui.overlay.hidden){const items=[...ui.modal.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length);if(items.length){const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}return;}
    if(e.code==='Escape'){
      if(game.mode==='playing'){resetInput();game.pause();}else if(['paused','map','inventory','shop','event'].includes(game.mode))game.closePanel();else if(game.mode==='menu'&&!ui.overlay.hidden)ui.close();e.preventDefault();return;
    }
    if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;
    if(game.mode!=='playing')return;
    const controlled=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyQ','KeyE','KeyR','KeyF','Digit1','Digit2','Tab','KeyM'];if(controlled.includes(e.code))e.preventDefault();keys.add(e.code);
    if(e.repeat)return;
    switch(e.code){case 'Space':input.dash=true;break;case 'KeyQ':input.skill=true;break;case 'KeyE':input.interact=true;break;case 'KeyR':input.drink=true;break;case 'Digit1':input.swap=0;break;case 'Digit2':input.swap=1;break;case 'KeyF':game.setSetting('autoFire',!game.meta.settings.autoFire);ui.toast(`自动射击${game.meta.settings.autoFire?'已开启':'已关闭'}`);break;case 'KeyM':resetInput();game.pause('map');break;case 'Tab':resetInput();game.pause('inventory');break;}
  });
  listen(window,'keyup',e=>{if(!mobileDevice)keys.delete(e.code);});
  listen(window,'blur',()=>{resetInput();if(game.mode==='playing')game.pause();});
  listen(document,'visibilitychange',()=>{if(document.hidden){resetInput();if(game.mode==='playing')game.pause();}last=null;accumulator=0;});
  document.getElementById('touchControls').hidden=!mobileDevice;
  if(mobileDevice){ui.play.classList.add('touch-play');ui.play.appendChild(document.getElementById('touchControls'));}
  function stick(element,kind){let pointer=null;const knob=element.querySelector('i');
    const move=e=>{const r=element.getBoundingClientRect(),rad=r.width*.36,dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,len=Math.hypot(dx,dy),k=len>rad?rad/len:1;knob.style.transform=`translate(${dx*k}px,${dy*k}px)`;const vector={x:dx*k/rad,y:dy*k/rad};if(kind==='move')touch.move=vector;else{touch.aim=vector;touch.aiming=len>rad*.2;}};
    listen(element,'pointerdown',e=>{if(!mobileDevice||pointer!==null)return;pointer=e.pointerId;element.setPointerCapture(pointer);audio.unlock();move(e);e.preventDefault();});
    listen(element,'pointermove',e=>{if(mobileDevice&&e.pointerId===pointer){move(e);e.preventDefault();}});
    const release=e=>{if(e.pointerId!==pointer)return;pointer=null;knob.style.transform='';if(kind==='move')touch.move={x:0,y:0};else{touch.aim={x:0,y:0};touch.aiming=false;}};
    listen(element,'pointerup',release);listen(element,'pointercancel',release);listen(element,'lostpointercapture',release);
  }
  stick(document.getElementById('moveStick'),'move');stick(document.getElementById('aimStick'),'aim');
  document.querySelectorAll('[data-touch]').forEach(button=>listen(button,'pointerdown',e=>{if(!mobileDevice)return;e.preventDefault();audio.unlock();if(game.mode!=='playing')return;const action=button.dataset.touch;if(action==='swap')input.swap='next';else input[action]=true;}));
  function collectInput(){
    input.mx=mobileDevice?touch.move.x:((keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0));
    input.my=mobileDevice?touch.move.y:(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-(keys.has('KeyW')||keys.has('ArrowUp')?1:0);
    input.fire=mobileDevice?touch.aiming:mouseDown;input.autoAim=false;
    if(mobileDevice&&touch.aiming&&game.player){input.aimX=game.player.x+touch.aim.x*460;input.aimY=game.player.y+touch.aim.y*460;}
  }
  function fitArena(){if(ui.play.hidden)return;const wrap=arena.parentElement,r=wrap.getBoundingClientRect();let w=Math.min(r.width,r.height*1.6);arena.style.width=`${Math.max(160,w)}px`;arena.style.height=`${Math.max(100,w/1.6)}px`;}
  const ro=new ResizeObserver(()=>fitArena());ro.observe(arena.parentElement);listen(window,'resize',fitArena);
  const eventNames=['run:start','run:end','room:enter','room:clear','floor:enter','boss:defeated','weapon:equipped','relic:acquired','pause','menu'];
  for(const name of eventNames)game.on(name,payload=>{
    if(['pause','menu','room:enter','run:end'].includes(name))resetInput();
    const eventPayload={game:'dream-campus',version:D.VERSION,event:name,payload};
    window.dispatchEvent(new CustomEvent(`dreamcampus:${name}`,{detail:payload}));
    if(typeof C.onEvent==='function'){try{C.onEvent(name,JSON.parse(JSON.stringify(payload)));}catch(e){console.warn('Host callback failed:',e);}}
    if(C.parentOrigin&&C.parentOrigin!=='*'&&window.parent!==window){try{const url=new URL(C.parentOrigin);if(url.origin===C.parentOrigin)window.parent.postMessage(eventPayload,C.parentOrigin);}catch(e){console.warn('Invalid parentOrigin; no message sent.');}}
  });
  function fatal(error){const box=document.getElementById('fatal');box.hidden=false;box.textContent='梦境暂时卡住了。请刷新并继续最近的房间检查点。\n\n错误：'+(error?.message||String(error));console.error(error);}
  function frame(timestamp){
    if(destroyed)return;try{
      const dt=last===null?0:Math.min((timestamp-last)/1000,.15);last=timestamp;
      collectInput();if(game.mode==='playing'||game.mode==='winning'){accumulator+=dt;let steps=0;while(accumulator>=1/60&&steps<9){game.update(1/60,input);accumulator-=1/60;steps++;}if(steps>=9)accumulator=0;}else accumulator=0;
      if(game.run&&!ui.play.hidden){renderer.render(timestamp/1000);hudClock+=dt;if(hudClock>.09){hudClock=0;ui.update();}}
      audio.update(dt,game);
    }catch(e){fatal(e);destroyed=true;return;}raf=requestAnimationFrame(frame);
  }
  D.CUSTOM_BEHAVIORS={};D.renderHooks={};
  const api={
    version:D.VERSION,
    start(options={}){ui.begin(options);fitArena();return game.snapshot();},
    pause(){game.pause();return game.snapshot();},resume(){game.resume();},
    getState(){return game.snapshot();},
    getContent(){return JSON.parse(JSON.stringify({weapons:D.WEAPONS,relics:D.RELICS,synergies:D.SYNERGIES,characters:D.CHARACTERS}));},
    on(name,fn){if(typeof fn!=='function')throw TypeError('Listener must be a function');return game.on(name,fn);},
    setSetting(key,value){return game.setSetting(key,value);},
    exportSave(){return JSON.parse(JSON.stringify({schema:1,game:'dream-campus',meta:game.meta,checkpoint:storage.read('run',null)}));},
    importSave(payload){
      if(game.mode!=='menu')throw Error('Return to the main menu before importing a save.');
      const data=typeof payload==='string'?JSON.parse(payload):payload;
      if(!data||data.schema!==1||data.game!=='dream-campus'||data.meta?.schema!==1)throw Error('Incompatible save format.');
      const oldMeta=storage.read('meta',D.defaultMeta()),oldRun=storage.read('run',null);
      try{
        if(!storage.write('meta',data.meta))throw Error('Storage is unavailable.');game.meta=storage.loadMeta();
        if(data.checkpoint){storage.write('run',data.checkpoint);if(!game.load())throw Error('The checkpoint is invalid.');}else storage.remove('run');
        game.returnToMenu();return true;
      }catch(e){storage.write('meta',oldMeta);if(oldRun)storage.write('run',oldRun);else storage.remove('run');game.meta=storage.loadMeta();game.run=null;game.returnToMenu();throw e;}
    },
    registerWeapon(def){
      if(!def||!/^[a-z][a-z0-9_]{1,40}$/.test(def.id)||Object.prototype.hasOwnProperty.call(D.WEAPONS,def.id))throw Error('A new, unique lower-case weapon id is required.');
      if(!Object.hasOwn(D.WEAPON_TYPES,def.type)&&!Object.hasOwn(D.CUSTOM_BEHAVIORS,def.type))throw Error('Unknown attack behavior.');
      for(const k of ['damage','interval','energy','speed','rarity'])if(!Number.isFinite(def[k]))throw Error(`Finite numeric ${k} is required.`);
      if(def.damage<=0||def.damage>1000||def.interval<.07||def.energy<0||def.speed<0||def.speed>1800||!Number.isInteger(def.rarity)||def.rarity<0||def.rarity>5)throw Error('Weapon stats exceed safe bounds.');
      if(!Object.hasOwn(D.TAGS,def.tag)||typeof def.name!=='string'||typeof def.description!=='string')throw Error('Valid tag, name and description are required.');
      const w={life:1,size:5,pellets:1,spread:0,pierce:0,icon:'book',...def};w.pellets=D.clamp(w.pellets,1,12);w.pierce=D.clamp(w.pierce,0,20);w.burst=D.clamp(w.burst||1,1,12);w.life=D.clamp(w.life,.08,5);D.WEAPONS[def.id]=w;return def.id;
    },
    registerAttackBehavior(id,handler,label=id){if(!/^[a-z][a-z0-9_]{1,40}$/.test(id)||typeof handler!=='function')throw TypeError('Invalid behavior registration');D.CUSTOM_BEHAVIORS[id]=handler;D.WEAPON_TYPES[id]=String(label).slice(0,32);},
    registerRenderer(layer,fn){if(!['enemy','player','bullet','prop'].includes(layer)||typeof fn!=='function')throw TypeError('Unknown render layer');D.renderHooks[layer]=fn;return()=>{delete D.renderHooks[layer];};},
    destroy(){destroyed=true;if(raf!==null)cancelAnimationFrame(raf);ro.disconnect();handlers.forEach(fn=>fn());ui.destroy();audio.destroy();resetInput();game.listeners.clear();if(window.__DC_DEBUG__)delete window.__DC_DEBUG__;}
  };
  window.DreamCampus=Object.freeze(api);
  if(debug){window.__DC_DEBUG__={game,renderer,ui,input,warp(floor,roomId){if(!game.run)api.start({seed:'debug',skipStory:true});game.run.floor=floor;game.run.pending=null;game.mode='playing';ui.close();game.enterRoom(roomId,null,true);ui.update();return game.snapshot();},give(id,slot=0){if(!D.WEAPONS[id])throw Error('Unknown weapon');game.run.inventory[slot]={id,level:0};game.recompute();game.discover(id);ui.update();},win(){game.finish(true);},step(seconds=1){for(let i=0;i<seconds*60;i++)game.update(1/60,input);},resetInput};}
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){game.meta.settings.shake=false;game.meta.settings.particles=false;}
  if(C.embedded)document.documentElement.dataset.embedded='true';
  if(C.title)document.title=String(C.title)+' · DREAM CAMPUS';
  ui.menu();raf=requestAnimationFrame(frame);
  window.dispatchEvent(new CustomEvent('dreamcampus:ready',{detail:{version:D.VERSION}}));
})();
