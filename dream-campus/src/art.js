/* Original vector assets. No downloaded sprites, external fonts, or runtime assets. */
(function(root){
  'use strict';const D=root.DC;
  const paths={
    book:'<path d="M10 13 29 10 29 53 10 56Z" fill="var(--tone)"/><path d="M29 10 53 15 53 57 29 53Z" fill="#f5edce"/><path d="m34 23 13 2m-13 6 13 2m-13 6 9 2"/>',
    pen:'<path d="m18 51 7-17L45 8l10 8-22 26-15 9Z" fill="var(--tone)"/><path d="m25 34 8 8m-15 9 2-8m18-29 11 9"/>',
    shoe:'<path d="M10 34 27 20l8 15 17 8q8 7-3 12H13q-8-5-3-21Z" fill="var(--tone)"/><path d="M10 48h42M25 30l9-3m-5 11 9-4"/>',
    cup:'<path d="M16 23h30l-4 33H20Z" fill="var(--tone)"/><path d="M46 26h6q12 15-9 18M12 22h38M21 15q-4-6 1-11m10 11q-4-6 1-11"/><path d="M24 37h12"/>',
    ruler:'<path d="M10 55 51 9v46Z" fill="var(--tone)"/><path d="m29 44 12-14v14Zm-9-5 5 4m1-11 5 4m1-11 5 4"/>',
    noodle:'<path d="M10 27h45L47 55H18Z" fill="var(--tone)"/><path d="M11 34h42M17 21q-6-11 0-15m10 15q-5-9 0-15M39 4l-5 23M50 6 40 27"/><path d="M23 44h17"/>',
    card:'<rect x="7" y="16" width="50" height="34" rx="6" fill="var(--tone)"/><path d="M8 27h48"/><circle cx="21" cy="37" r="5" fill="#eee5ca"/><path d="M32 35h15m-15 7h10"/>',
    laser:'<path d="m10 46 28-28 10 10-28 28Z" fill="var(--tone)"/><path d="m39 17 8-8m1 9 11-4m-13 11 13 3" stroke="#ee9a8d"/><circle cx="27" cy="38" r="3" fill="#f5e9c7"/>',
    meal:'<path d="M9 22h46l-4 34H13Z" fill="var(--tone)"/><path d="M7 22 18 10h30l9 12M12 31h40M33 32v22"/><path d="M20 39h6m-6 7h6m14-5h6"/>',
    keyboard:'<rect x="5" y="19" width="54" height="30" rx="5" fill="var(--tone)"/><path d="M13 27h4m5 0h4m5 0h4m5 0h4m5 0h3M13 35h4m5 0h4m5 0h4m5 0h4m5 0h3M18 42h27"/>',
    hammer:'<path d="m18 56 9-2 16-35-8-4Z" fill="#c29c76"/><path d="M14 13 22 5l32 15-5 12-18-9-8 3Z" fill="var(--tone)"/><path d="m30 32 8 4"/>',
    chalk:'<path d="m12 45 9-28 13 4-9 29Z" fill="#f1e9d3"/><path d="m34 48 5-36 12 2-4 35Z" fill="var(--tone)"/><path d="m12 45 13 5m9-2 13 1"/>',
    usb:'<path d="m12 43 22-25 15 13-23 25Z" fill="var(--tone)"/><path d="m34 18 9-11 15 13-9 11Z" fill="#dddcca"/><path d="m43 17 4 4m-8 0 4 4"/><circle cx="25" cy="42" r="3"/>',
    stapler:'<path d="M9 44h46v10H9Z" fill="#c1ccc5"/><path d="m10 33 5-18 42 9-3 20Z" fill="var(--tone)"/><path d="m19 23 27 6M17 45v-7"/>',
    laptop:'<path d="M12 9h40v30H12Z" fill="var(--tone)"/><path d="M17 14h30v20H17Z" fill="#243d3a"/><path d="m24 24 5-5m6 0 5 5-5 5m-6 0-5-5" stroke="#acf0cc"/><path d="m12 39-7 15h54l-7-15ZM20 45h23" fill="#a8b7ac"/>',
    battery:'<rect x="13" y="13" width="38" height="44" rx="7" fill="var(--tone)"/><path d="M23 13V7h18v6M35 22 24 37h10l-6 13 15-18H33Z" fill="#f5e9b3"/>',
    parcel:'<path d="m8 22 25-13 24 13v30L32 62 8 49Z" fill="var(--tone)"/><path d="m8 22 24 11 25-11M32 33v28M20 16l24 12v12M16 37l8 4"/>',
    compass:'<circle cx="32" cy="34" r="23" fill="var(--tone)"/><path d="M27 11V5h10v6"/><circle cx="32" cy="34" r="16" fill="#edf0d9"/><path d="m41 21-6 18-12 8 6-18Z" fill="#e18d80"/><path d="m29 29 6 10"/>',
    core:'<path d="M22 7h20v42L32 60 22 49Z" fill="var(--tone)"/><path d="m22 15 20 7m-20 4 20 7m-20 4 20 7M27 8v-4h10v4"/>',
    bottle:'<path d="M26 7h13v13l8 9v29H18V29l8-9Z" fill="var(--tone)"/><path d="M25 7V3h15v4M20 36h26v12H20Z" fill="#f3e2b4"/><circle cx="32" cy="41" r="3"/>',
    umbrella:'<path d="M6 30q26-43 52 0-9-7-17 0-9-7-18 0-9-7-17 0Z" fill="var(--tone)"/><path d="M32 5v44q0 12 12 6M32 9Q19 17 23 30M32 9q14 7 9 21"/>',
    router:'<rect x="10" y="35" width="44" height="19" rx="5" fill="var(--tone)"/><path d="M16 35V18m33 17V18M21 17q11-10 22 0M26 24q6-6 12 0"/><circle cx="32" cy="29" r="2"/><path d="M19 45h4m6 0h4m6 0h4"/>',
    mouse:'<path d="M32 8q19 0 19 27T32 57Q13 57 13 35T32 8Z" fill="var(--tone)"/><path d="M32 8v22M15 29h34M32 8V2"/><rect x="29" y="15" width="6" height="11" rx="3" fill="#f0e9d0"/>',
    pot:'<path d="M10 28h44v18q-2 13-22 13T10 46Z" fill="var(--tone)"/><path d="M10 35H4v12h6m44-12h6v12h-6M32 28v29M17 20q-8-8-2-15m17 15q-8-8-2-15m17 15q-8-8-2-15"/>',
    slides:'<path d="M19 7h38v33H19Z" fill="#e9d9b2"/><path d="M8 17h38v33H8Z" fill="var(--tone)"/><path d="M6 17h42M27 50v11m-11 0h22M15 38l8-10 7 6 8-8"/>',
    clock:'<circle cx="32" cy="34" r="22" fill="var(--tone)"/><path d="M32 20v15l11 7M20 7 10 16M44 7l10 9m-37 38-5 7m35-7 5 7"/>',
    certificate:'<path d="M12 7h40v45H12Z" fill="#f4e6bd"/><path d="M20 18h24M20 26h24m-24 8h10"/><circle cx="41" cy="45" r="9" fill="var(--tone)"/><path d="m36 52-1 9 6-4 6 4-1-9" fill="var(--tone)"/>',
    scope:'<path d="m31 9 9-6 15 22-10 7Z" fill="var(--tone)"/><path d="m42 29-6 5-7-10 6-5M15 27Q4 47 23 53h25M10 59h46M18 40h22M22 53v6"/><circle cx="23" cy="26" r="6" fill="#e1ddbf"/>',
    sensor:'<path d="M19 19h27v29H19Z" fill="var(--tone)"/><path d="M25 48v12m14-12v12M32 19V5m-7 5h14M5 34h5l4-9 7 19 6-10h8l5-11 6 18 4-7h9"/>',
    fan:'<circle cx="32" cy="26" r="22" fill="var(--tone)"/><circle cx="32" cy="26" r="16" fill="#e0e9d8"/><path d="M32 27q-17-4-8-14 10-2 8 14Zm0 0q13-14 17-1 0 9-17 1Zm0 0q8 15-5 15-9-5 5-15ZM29 48v9m7-9v9M20 60h25"/>',
    boba:'<path d="M16 19h34l-5 40H21Z" fill="var(--tone)"/><path d="M13 19h40M36 19l7-16M19 38h28"/><g fill="#5c4940"><circle cx="28" cy="48" r="3"/><circle cx="37" cy="46" r="3"/><circle cx="34" cy="54" r="3"/></g>',
    report:'<path d="M20 5h33v44H20Z" fill="#efdab2"/><path d="M11 14h33v45H11Z" fill="var(--tone)"/><path d="M18 27h18m-18 8h18m-18 8h11m2-29V9"/>',
    drone:'<path d="M25 25h16v16H25Z" fill="var(--tone)"/><path d="M25 25 14 14m27 11 10-11M25 41 14 51m27-10 10 10"/><ellipse cx="13" cy="13" rx="10" ry="5" fill="#d8dfd1"/><ellipse cx="51" cy="13" rx="10" ry="5" fill="#d8dfd1"/><ellipse cx="13" cy="51" rx="10" ry="5" fill="#d8dfd1"/><ellipse cx="51" cy="51" rx="10" ry="5" fill="#d8dfd1"/><circle cx="33" cy="33" r="4"/>',
    washer:'<rect x="10" y="6" width="44" height="54" rx="4" fill="var(--tone)"/><path d="M10 18h44M18 12h8m16 0h5"/><circle cx="32" cy="39" r="15" fill="#d3e9dd"/><path d="M21 39q11-11 22 0-11 11-22 0Z" fill="#71ae9f"/>',
    mineral:'<path d="m8 48 6-24 11-9 9 9 13-14 10 20-7 26H17Z" fill="var(--tone)"/><path d="m25 15-3 33 12 8V24m13-14-3 36 6 10M14 24l8 24-5 8M44 46l13-16"/>',
    station:'<path d="M5 10h39v30H5Z" fill="var(--tone)"/><path d="M11 15h27v19H11Z" fill="#21433a"/><path d="m13 30 7-10 8 7 8-8" stroke="#ace4b7"/><path d="M24 40v11M11 55h27"/><rect x="47" y="14" width="13" height="41" rx="3" fill="#a4b7a6"/><path d="M51 22h5m-5 6h5m-5 19h5"/>',
    pipe:'<path d="M13 58V25q0-13 12-13h7v10h-6q-3 0-3 5v31ZM42 58V25q0-13 12-13h5v10h-4q-3 0-3 5v31Z" fill="var(--tone)"/><path d="M7 59h50M32 12q-5-6 0-10m13 10q-5-6 0-10"/>',
    fault:'<path d="m5 25 23-10 9 12 21-8v18L35 48l-9-14L5 45Z" fill="var(--tone)"/><path d="m28 15-2 19m11-7-2 21M6 32l18-8m15 11 17-8M32 5l-3 6m11 41-3 7"/>',
    ladle:'<path d="m42 5 9 5-18 29-9-6Z" fill="#ccb083"/><path d="M26 28Q4 26 5 44q1 18 20 15t16-14Z" fill="var(--tone)"/><ellipse cx="22" cy="43" rx="11" ry="8" fill="#f0e2b7"/>',
    letter:'<path d="m5 25 27-19 27 19v32H5Z" fill="var(--tone)"/><path d="M12 25V10h40v15M5 25l27 21 27-21M5 57l19-17m35 17L40 40"/><path d="M22 22h20M22 29h17"/>',
    printer:'<path d="M17 7h30v17H17Z" fill="#f3e7c9"/><path d="M7 23h50v25H7Z" fill="var(--tone)"/><path d="M17 39h30v21H17Z" fill="#f3e7c9"/><path d="M23 47h17m-17 6h12M44 30h5"/>',
    ticket:'<path d="M6 17h52v11q-9 5 0 10v12H6V38q9-5 0-10Z" fill="var(--tone)"/><path d="M42 20v4m0 5v4m0 5v4m0 4v1M16 27h17m-17 7h11m-11 7h17"/>',
    coil:'<path d="M27 55V24h11v31M17 59h31" fill="#b6baa0"/><ellipse cx="32" cy="21" rx="16" ry="8" fill="var(--tone)"/><path d="M22 31h21m-21 7h21m-21 7h21M9 7l-4 13 10-2-4 12M49 4l-4 13 11-2-4 12" stroke="#eec873"/>',
    meteor:'<path d="m4 50 24-8 9-29 5 11 10-18 5 31-8 16-22 7Z" fill="#e9ad70"/><path d="m19 45 7-17 17 3 9 17-16 12Z" fill="var(--tone)"/><path d="m26 28 4 18 13-15m-13 15 6 14"/>',
    alarm:'<path d="M15 14q17-18 34 0v37H15Z" fill="var(--tone)"/><path d="M12 55h40M20 59h24M21 28q10-10 21 0m-20 8q10-10 20 0M8 19l-4-5m52 5 4-5"/>',
    diploma:'<path d="M13 8h39v42H13Z" fill="#f6e5b0"/><path d="M20 17h23m-23 8h23m-23 8h14"/><path d="m8 43 23-8 24 8-24 9Z" fill="var(--tone)"/><path d="M18 48v8q14 10 28 0v-8M54 43v13"/>',
    helmet:'<path d="M10 43V32q1-22 22-22t22 22v11Z" fill="var(--tone)"/><path d="M7 43h50v10H7ZM27 11v22m10-22v22"/>',
    heart:'<path d="M32 57 9 34C-5 10 18 2 32 20 45 2 68 10 55 34Z" fill="var(--tone)"/><path d="M14 32h9l5-10 7 20 5-10h10" stroke="#fff1d5"/>',
    goggles:'<path d="M5 23h22v20H5Zm32 0h22v20H37Z" fill="var(--tone)"/><path d="M27 30h10M5 26 1 17m58 9 4-9m-51 21 9-8m23 8 9-8"/>',
    headset:'<path d="M10 39V27q0-20 22-20t22 20v12"/><rect x="6" y="29" width="12" height="25" rx="6" fill="var(--tone)"/><rect x="46" y="29" width="12" height="25" rx="6" fill="var(--tone)"/><path d="M48 52q-2 11-15 7"/>',
    coin:'<circle cx="32" cy="32" r="25" fill="var(--tone)"/><circle cx="32" cy="32" r="18"/><path d="M39 21H27q-10 10 5 11t0 11H23m9-26v31"/>',
    chair:'<rect x="16" y="5" width="33" height="30" rx="6" fill="var(--tone)"/><path d="M13 35h40v10H13Zm7 10v15m26-15v15M11 18v22m44-22v22"/>',
    phone:'<rect x="17" y="3" width="31" height="58" rx="6" fill="var(--tone)"/><path d="M23 11h19v38H23ZM29 55h7"/><path d="m28 27 3 3m6-3 3 3m-12 8q6 5 12 0"/>',
    candy:'<path d="m17 22-14-5v28l14-5m30-18 14-5v28l-14-5" fill="var(--tone)"/><circle cx="32" cy="32" r="18" fill="#e4e9bb"/><path d="M23 17q16 14 3 32M35 15q14 12 7 30"/>',
    eraser:'<path d="m7 43 27-33 25 20-22 28H23Z" fill="var(--tone)"/><path d="m19 28 26 20M23 58h35"/>',
  };
  D.iconSvg=function(id,color='#86cdb1',size=52){const body=paths[id]||paths.book;return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" stroke="#24463b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" style="--tone:${color}">${body.replaceAll('var(--tone)',color)}</svg>`;};
  D.ICON_PATHS=paths;
  const cache=new Map();
  D.getIcon=function(id,color){const key=id+color;if(!cache.has(key)){const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(D.iconSvg(id,color,96));cache.set(key,img);}return cache.get(key);};
  D.Art={
    rr(c,x,y,w,h,r=5){c.beginPath();c.roundRect(x,y,w,h,r);},
    box(c,x,y,w,h,fill,r=4,stroke='#142e28',line=2.5){c.fillStyle=fill;c.strokeStyle=stroke;c.lineWidth=line;this.rr(c,x,y,w,h,r);c.fill();if(line)c.stroke();},
    ellipse(c,x,y,rx,ry,fill){c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();},
    line(c,x,y,x2,y2,color,width=3){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();},
    icon(c,id,x,y,size,color='#86cdb1'){const img=D.getIcon(id,color);if(img.complete&&img.naturalWidth)c.drawImage(img,x-size/2,y-size/2,size,size);},
    shadow(c,x,y,r){this.ellipse(c,x,y+7,r,Math.max(6,r*.33),'rgba(7,22,19,.32)');},
    player(c,p,char,time,opts={}){
      const color=char.color,step=p.moving?Math.sin(time*16)*2:Math.sin(time*3)*.55,bob=p.dashTime>0?-3:step;
      c.save();c.translate(p.x,p.y);if(p.invuln>0&&Math.sin(time*45)<-.05)c.globalAlpha=.55;
      this.shadow(c,0,0,20);c.translate(0,bob);
      this.box(c,-20,-29,15,24,'#dcb181',5);this.box(c,-12,-30,26,28,color,8);
      this.box(c,-12,-3,10,12,'#394d43',3);this.box(c,4,-3,10,12,'#394d43',3);
      this.box(c,-15,4+(p.moving?step:0),14,6,'#eae1c5',3);this.box(c,3,4-(p.moving?step:0),15,6,'#eae1c5',3);
      this.box(c,-14,-56,30,29,'#e8c4a0',9);
      c.fillStyle='#344238';c.beginPath();c.moveTo(-16,-43);c.lineTo(-17,-54);c.quadraticCurveTo(-11,-67,6,-63);c.quadraticCurveTo(21,-62,19,-48);c.lineTo(10,-49);c.lineTo(5,-54);c.lineTo(-2,-47);c.lineTo(-9,-50);c.closePath();c.fill();
      const side=Math.cos(p.a)>0?2:-2;this.ellipse(c,-4+side,-41,2.1,2.8,'#22372e');this.ellipse(c,8+side,-41,2.1,2.8,'#22372e');this.line(c,2,-34,7,-34,'#b47c63',1.7);
      if(char.id==='geo'){this.box(c,-18,-63,40,9,'#ecd28c',3);c.fillStyle='#d8b869';c.beginPath();c.arc(2,-63,14,Math.PI,0);c.fill();this.line(c,2,-77,2,-65,'#f7e4aa',4);}
      if(char.id==='cram'){this.box(c,-11,-47,12,9,'rgba(255,255,255,.14)',3,'#735e73',2);this.box(c,5,-47,12,9,'rgba(255,255,255,.14)',3,'#735e73',2);this.line(c,1,-43,5,-43,'#735e73',2);}
      this.line(c,-7,-25,-7,-15,'#fff1cf',2);this.line(c,8,-25,8,-15,'#fff1cf',2);
      c.save();c.translate(6,-18);c.rotate(p.a);this.box(c,1,-5,20,10,'#e8c4a0',4);if(opts.weaponIcon){this.icon(c,opts.weaponIcon,30,-1,36,opts.weaponColor||'#99cbb9');}else{this.box(c,16,-8,28,15,opts.weaponColor||'#99cbb9',4);this.box(c,40,-5,10,9,'#526f61',2);}c.restore();
      if(opts.graduate){c.strokeStyle='#f6d797';c.lineWidth=2;c.beginPath();c.ellipse(1,-80,21,6,0,0,D.TAU);c.stroke();}
      c.restore();
    },
    enemy(c,e,time){
      c.save();c.translate(e.x,e.y);const bob=Math.sin(time*4+e.id)*2.1;
      if(e.spawnTime>0)c.globalAlpha=.2+(.8-e.spawnTime)*.7;
      this.shadow(c,0,0,e.r*1.1);c.translate(0,bob);
      if(e.elite){c.strokeStyle='#efc972';c.lineWidth=2;c.beginPath();c.ellipse(0,5,e.r+10,(e.r+10)*.42,0,0,D.TAU);c.stroke();}
      if(e.boss){this.boss(c,e,time);c.restore();return;}
      const col=e.flash>0?'#fffbe4':e.color;
      const eyes=(y=-17,spread=8)=>{this.ellipse(c,-spread,y,2.8,3.5,'#302f35');this.ellipse(c,spread,y,2.8,3.5,'#302f35');this.line(c,-spread-4,y-7,-spread+3,y-5,'#4b3837',2);this.line(c,spread+4,y-7,spread-3,y-5,'#4b3837',2);};
      switch(e.kind){
        case 'paper':case 'mini':{
          const s=e.kind==='mini'?.65:1;c.scale(s,s);this.box(c,-16,-38,32,39,col,3);c.fillStyle='#c3bea4';c.beginPath();c.moveTo(5,-38);c.lineTo(16,-28);c.lineTo(5,-28);c.fill();eyes(-19,7);this.line(c,-8,-9,6,-9,'#8d816c',2);this.line(c,-10,2,-14,9,'#adae85',4);this.line(c,10,2,15,8,'#adae85',4);break;
        }
        case 'slime':{c.fillStyle=col;c.strokeStyle='#304b34';c.lineWidth=3;c.beginPath();c.moveTo(-22,0);c.bezierCurveTo(-25,-25,-13,-42,1,-37);c.bezierCurveTo(16,-40,25,-20,23,0);c.quadraticCurveTo(0,13,-22,0);c.fill();c.stroke();eyes(-15,8);this.ellipse(c,-8,-27,5,3,'#d3f0b0');this.line(c,-6,-5,6,-5,'#477141',2);break;}
        case 'rollcall':{this.box(c,-21,-43,42,46,'#6c524e',4);this.box(c,-17,-44,35,43,col,3);this.line(c,-10,-38,-10,-2,'#a95e5b',3);eyes(-19,7);this.box(c,-10,-40,26,9,'#e5d39e',2);this.line(c,-6,-7,9,-7,'#854b4b',2);break;}
        case 'printer':{this.box(c,-22,-30,44,34,col,5);this.box(c,-14,-51,29,26,'#ecdfbd',2);this.line(c,-9,-43,9,-43,'#aaa384',2);this.box(c,-14,-15,30,11,'#35473e',2);this.box(c,-11,-12,23,22,'#e9ddbe',2);this.line(c,-6,-4,6,-4,'#aaa384',2);this.ellipse(c,13,-24,3,3,'#d6847d');eyes(-28,7);break;}
        case 'charger':{this.box(c,-17,-30,34,28,col,6);this.box(c,-16,-55,31,29,'#dfb998',6);c.fillStyle='#4f4336';c.beginPath();c.moveTo(-18,-50);for(let i=0;i<5;i++){c.lineTo(-18+i*8,-64+(i%2)*6);c.lineTo(-14+i*8,-49);}c.fill();eyes(-39,7);this.box(c,-12,-43,11,8,'#f1cd91',2);this.box(c,3,-43,11,8,'#f1cd91',2);this.line(c,0,-42,3,-42,'#302f35',2);this.line(c,-11,-3,-17,10,'#514d41',7);this.line(c,10,-3,17,9,'#514d41',7);this.line(c,0,-24,0,-9,'#eedfb4',4);break;}
        case 'bomb':{this.box(c,-15,-33,30,34,col,5);this.line(c,2,-35,6,-47,'#4d4835',3);this.ellipse(c,8,-48,5+Math.sin(time*15)*2,5,'#f7d080');eyes(-17,7);this.box(c,-9,-8,18,6,'#633d3b',1);break;}
        case 'cleaner':{this.box(c,-26,-35,52,36,col,8);this.box(c,-18,-54,36,26,'#cbc7ac',5);eyes(-40,8);this.line(c,26,-42,25,9,'#a3865e',5);this.box(c,12,4,29,11,'#d0c5a0',3);this.ellipse(c,-16,5,8,8,'#34453c');this.ellipse(c,16,5,8,8,'#34453c');break;}
        case 'mosquito':{this.ellipse(c,-17,-29,18,8+Math.sin(time*30)*4,'#d4cce291');this.ellipse(c,17,-29,18,8+Math.sin(time*30)*4,'#d4cce291');this.box(c,-10,-32,20,26,col,9);eyes(-22,5);this.line(c,0,-15,Math.cos(e.a)*24,-15+Math.sin(e.a)*24,'#f1ddae',3);this.line(c,-7,-7,-13,3,col,2);this.line(c,7,-7,13,3,col,2);break;}
        case 'summoner':{this.box(c,-21,-34,42,36,col,9);this.box(c,-15,-56,31,28,'#daba9d',8);eyes(-41,7);this.box(c,-9,-25,20,30,'#665a6a',4);this.box(c,-5,-21,12,20,'#9fc1bc',2);this.ellipse(c,-24,-16,8,5,'#daba9d');this.ellipse(c,25,-16,8,5,'#daba9d');break;}
        case 'ghost':{c.fillStyle=col;c.beginPath();c.moveTo(-22,5);c.lineTo(-21,-27);c.bezierCurveTo(-19,-53,22,-53,22,-27);c.lineTo(24,5);for(let i=4;i>=0;i--)c.lineTo(-22+i*11,i%2?0:8);c.closePath();c.fill();this.box(c,-14,-33,28,20,'#2e5f5b',5);this.line(c,-9,-27,-4,-23,'#a9e9cd',3);this.line(c,5,-27,10,-23,'#a9e9cd',3);this.line(c,-7,-5,9,-5,'#549d91',3);break;}
        case 'proctor':{this.box(c,-21,-39,42,43,col,6);this.box(c,-15,-61,31,28,'#d8b699',6);this.box(c,-20,-64,40,10,'#555266',4);eyes(-44,7);c.save();c.rotate(e.a);this.box(c,12,-28,11,52,'#dbdbbb',4);this.line(c,19,-17,19,17,'#989f93',3);c.restore();break;}
        case 'slide':{this.box(c,-26,-49,52,44,col,5);this.box(c,-21,-44,42,32,'#e5ddc4',2);eyes(-27,9);this.line(c,-14,-16,12,-16,'#ab9baa',3);this.line(c,0,-4,0,11,'#a395b2',4);this.line(c,-14,12,14,12,'#a395b2',4);break;}
      }
      if(e.burn>0)this.icon(c,'meteor',e.r-2,-e.r*2,17,'#e9ad70');
      if(e.wet>0){this.ellipse(c,-e.r+3,-e.r*2,3,5,'#9ce1df');this.ellipse(c,-e.r+10,-e.r*2-5,2,4,'#9ce1df');}
      c.restore();
    },
    boss(c,e,time){
      const col=e.flash>0?'#fff4cf':e.color;
      if(e.kind==='chef'){
        this.box(c,-44,-40,88,42,'#687e72',9);this.ellipse(c,-29,4,14,14,'#2d4239');this.ellipse(c,28,4,14,14,'#2d4239');this.ellipse(c,-29,4,7,7,'#a5b3a0');this.ellipse(c,28,4,7,7,'#a5b3a0');
        this.box(c,-29,-84,59,58,col,10);this.box(c,-23,-79,47,51,'#f2e5c4',8);this.box(c,-23,-118,48,38,'#d9af89',12);
        this.box(c,-29,-126,61,17,'#f3ecd6',7);this.ellipse(c,-17,-129,17,15,'#f3ecd6');this.ellipse(c,4,-137,20,20,'#f3ecd6');this.ellipse(c,24,-129,16,15,'#f3ecd6');
        this.line(c,-15,-61,16,-61,'#d4b17d',3);this.icon(c,'ladle',47,-71,71,'#d9c787');this.icon(c,'pot',-48,-59,49,'#acbda5');
      }else{
        c.fillStyle=e.kind==='principal'?'#69586d':'#576b58';c.strokeStyle='#223930';c.lineWidth=3;c.beginPath();c.moveTo(-27,-72);c.lineTo(-43,5);c.quadraticCurveTo(0,21,43,5);c.lineTo(27,-72);c.fill();c.stroke();
        this.box(c,-24,-79,49,68,col,9);this.box(c,-17,-73,36,56,'#f0e3bd',6);
        this.line(c,2,-64,2,-26,e.kind==='principal'?'#a96372':'#67896c',11);this.box(c,-25,-118,50,41,'#d7b18e',11);
        if(e.kind==='principal'){
          c.fillStyle='#3a3540';c.beginPath();c.moveTo(-42,-123);c.lineTo(0,-139);c.lineTo(44,-123);c.lineTo(1,-109);c.fill();this.line(c,38,-122,38,-96,'#e1c889',3);this.ellipse(c,38,-92,4,7,'#e1c889');this.icon(c,'certificate',-48,-50,54,'#e5b582');this.icon(c,'hammer',43,-45,68,'#eaa5af');
        }else{this.box(c,-27,-123,56,12,'#5b514b',6);this.icon(c,'book',-43,-49,62,'#b594c7');this.icon(c,'laser',44,-59,61,'#e6b58c');}
        this.box(c,-23,-3,19,13,'#343b34',4);this.box(c,7,-3,19,13,'#343b34',4);
      }
      this.box(c,-20,-107,17,13,'rgba(255,255,255,.10)',3,'#4b4140',3);this.box(c,5,-107,17,13,'rgba(255,255,255,.10)',3,'#4b4140',3);this.line(c,-3,-102,5,-102,'#4b4140',3);this.line(c,-10,-86,12,-86,'#9f6a54',2);
      if(e.stage>=2){c.strokeStyle='#e9c779';c.lineWidth=2;c.beginPath();c.ellipse(0,-150,22+Math.sin(time*3)*3,7,0,0,D.TAU);c.stroke();}
    }
  };
})(typeof window!=='undefined'?window:globalThis);
