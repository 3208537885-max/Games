/* Original inline SVG artwork; no fonts, images, or CDN downloads. */
(function(root){
'use strict';
const paths={
 leaf:'M19 4C9 3 4 8 5 15c6 4 13 1 14-11ZM5 20 15 9',
 book:'M3 4h6c2 0 3 1 3 3v14c0-2-1-3-3-3H3ZM21 4h-6c-2 0-3 1-3 3v14c0-2 1-3 3-3h6Z',
 brain:'M9 4a3 3 0 0 0-5 3 4 4 0 0 0-1 7 4 4 0 0 0 6 5M15 4a3 3 0 0 1 5 3 4 4 0 0 1 1 7 4 4 0 0 1-6 5M9 3v18M15 3v18M5 9h4M15 9h4M6 15h3M15 15h3',
 chat:'M20 11a8 8 0 0 1-8 8H4l-2 3V11a9 9 0 0 1 18 0ZM6 9h10M6 13h7',
 heart:'M12 20 3 11a5 5 0 0 1 9-6 5 5 0 0 1 9 6Z',
 spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3ZM20 2v4M18 4h4',
 sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
 cloud:'M6 18a5 5 0 1 1 0-10 6 6 0 0 1 12 1 4.5 4.5 0 0 1 0 9ZM7 21v1M12 21v1M17 21v1',
 clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v6l4 2',
 flask:'M9 2h6M10 2v7L4 19q-1 3 3 3h10q4 0 3-3L14 9V2M7 15h10M10 18h1',
 code:'m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18',
 pen:'m3 17 1 4 4-1L21 7l-5-5ZM13 5l5 5M3 17l5 3',
 flag:'M4 22V3c5-5 10 5 16 0v11c-6 5-11-5-16 0',
 compass:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 5-3 7-7 3 3-7Z',
 briefcase:'M8 6V3h8v3M2 7h20v14H2ZM2 11l10 4 10-4M10 13h4v4h-4Z',
 building:'m2 8 10-6 10 6ZM3 22h18M5 9v10M10 9v10M15 9v10M20 9v10M2 19h20',
 run:'M15 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5 9l5-2 4 5 5 1M12 9l-3 7-6 4M10 15l5 3-1 4',
 game:'M7 7h10c3 0 5 5 5 10 0 3-3 4-6-1H8c-3 5-6 4-6 1 0-5 2-10 5-10ZM7 9v6M4 12h6M16 10h.1M19 13h.1',
 globe:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2c-7 6-7 14 0 20 7-6 7-14 0-20Z',
 tools:'m14 3 2 5 5 2a6 6 0 0 1-8 5l-7 7-4-4 7-7a6 6 0 0 1 5-8Z',
 laptop:'M4 3h16v13H4ZM2 20h20l-2-4H4Z',
 gift:'M3 9h18v4H3ZM5 13v9h14v-9M12 9v13M12 9C1 9 5-4 12 9Zm0 0C23 9 19-4 12 9Z',
 wallet:'M3 4h17v4H3q-2 0-2 3v8q0 3 3 3h17V8M15 12h7v5h-7ZM18 14h1',
 medal:'m6 2 6 8 6-8M3 2h6l3 5 3-5h6M12 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3v6M10 15l2-2',
 music:'M9 18V4l12-2v14M9 7l12-2M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
 camera:'M3 7h4l2-3h6l2 3h4v14H3ZM12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
 moon:'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z',
 home:'m2 11 10-9 10 9M5 9v13h14V9M9 22v-8h6v8',
 save:'M3 2h15l4 4v16H3ZM7 2v7h10V2M7 22v-9h11v9',
 arrow:'M3 12h18M15 6l6 6-6 6',
 down:'M12 2v14M6 10l6 6 6-6M3 19v3h18v-3',
 up:'M12 18V4M6 10l6-6 6 6M3 19v3h18v-3',
 plus:'M12 4v16M4 12h16',
 cross:'m5 5 14 14M5 19 14-14',
 check:'m4 12 5 5L21 5',
 lock:'M6 10V7a6 6 0 0 1 12 0v3M4 10h16v12H4ZM12 14v4',
 menu:'M3 6h18M3 12h18M3 18h18',
 chevron:'m9 5 7 7-7 7',
 volume:'m3 9 4 0 5-5v16l-5-5H3ZM16 8a6 6 0 0 1 0 8M19 4a11 11 0 0 1 0 16',
 map:'m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3ZM8 2v17M16 5v17',
 trophy:'M7 2h10v9a5 5 0 0 1-10 0ZM7 5H2v3a5 5 0 0 0 5 5M17 5h5v3a5 5 0 0 1-5 5M12 16v6M7 22h10',
 info:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM12 11v6M12 7v.1'
};
function icon(name,cls=''){return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.spark}"/></svg>`;}
function portrait(n,size=80){
 const h=Array.from(n.id).reduce((v,c)=>v*31+c.charCodeAt(0),7)>>>0,style=h%5;
 const skins=['#e9bd9e','#d7a486','#c99070','#efcbb0','#d4aa8d'];const skin=skins[h%5],hair=['#24232d','#382d2b','#24343b','#3a2937','#4b392d'][Math.floor(h/3)%5];
 const male=n.gender==='male';const back=male?'M23 46Q13 10 50 13T78 46Z':['M18 90V44Q15 9 50 12T82 44V90Z','M20 73Q8 14 50 13T80 73Z','M17 69V39Q24 4 56 13T82 48L73 83Z'][h%3];
 const fringe=['M25 39Q20 10 53 16T76 39L62 27 40 36 29 30Z','M24 42Q17 12 51 13T77 41L56 25 33 40Z','M24 39Q28 9 56 15T77 39L66 27 53 33 43 25 27 37Z','M24 40Q13 14 49 12T77 39L55 24 38 34 28 29Z','M25 41Q17 16 48 12T77 42L60 20 54 36 40 32Z'][style];
 const accessory=h%4===0?'<g fill="none" stroke="#6b645b" stroke-width="1.6"><rect x="30" y="43" width="17" height="10" rx="3"/><rect x="53" y="43" width="17" height="10" rx="3"/><path d="M47 46h6"/></g>':h%4===1?'<path d="m69 34 5 2" stroke="#cba4c8" stroke-width="3"/>':'';
 return `<svg class="portrait" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="28" fill="${n.color}" opacity=".18"/><path d="${back}" fill="${hair}"/><path d="M14 100Q16 71 50 72T86 100Z" fill="${n.color}"/><path d="M43 63v13q7 5 14 0V63" fill="${skin}"/><ellipse cx="50" cy="46" rx="23" ry="27" fill="${skin}"/><path d="${fringe}" fill="${hair}"/><path d="M35 47h4M61 47h4" stroke="#3c3031" stroke-width="2.2" stroke-linecap="round"/><path d="M46 59q5 ${h%2?3:4} 10-1" stroke="#a36965" fill="none" stroke-width="1.5" stroke-linecap="round"/>${accessory}<path d="m35 78 15 9 15-9" fill="none" stroke="#d4ddd8" opacity=".6" stroke-width="2"/>${h%3===0?'<path d="M50 87v13" stroke="#54646b" stroke-width="2"/>':''}</svg>`;
}
function campus(season='autumn',large=false){
 const foliage={autumn:'#8d7350',winter:'#4c686c',spring:'#3f8668',summer:'#296e5c'}[season]||'#3f8668';
 const moon={autumn:'#e2cb9a',winter:'#c4d8e5',spring:'#c2dfd3',summer:'#dcd3ad'}[season];
 const windows=(x,y,cols,rows,dx=18,dy=19)=>Array.from({length:rows},(_,j)=>Array.from({length:cols},(_,i)=>`<rect x="${x+i*dx}" y="${y+j*dy}" width="8" height="11" rx="1" fill="${(i+j)%4===0?'#263e49':(i+j)%3===0?'#87baa6':'#d4b47b'}" opacity="${(i+j)%4===0?.7:.9}"/>`).join('')).join('');
 const tree=(x,y,z=1)=>`<g transform="translate(${x} ${y}) scale(${z})"><ellipse cy="21" rx="19" ry="6" fill="#041019" opacity=".4"/><path d="M0-12v34" stroke="#7f765e" stroke-width="3"/><circle cy="-11" r="20" fill="${foliage}"/><circle cx="-9" cy="-4" r="14" fill="#24483f"/><path d="M0-2v24" stroke="#516452" stroke-width="2"/></g>`;
 const lamp=(x,y)=>`<g><circle cx="${x}" cy="${y}" r="18" fill="#ffd994" opacity=".045"/><circle cx="${x}" cy="${y}" r="9" fill="#ffd994" opacity=".09"/><path d="M${x} ${y+2}v24" stroke="#66848b" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2.8" fill="#efce97"/></g>`;
 const stars=Array.from({length:33},(_,i)=>`<circle cx="${27+(i*83)%709}" cy="${15+(i*37)%114}" r="${i%5===0?1.5:.8}" fill="#abc7d1" opacity="${.18+(i%4)*.12}"/>`).join('');
 return `<svg class="campus-art ${large?'large':''}" viewBox="0 0 760 420" role="img" aria-label="上海大学场景示意插画，非实景测绘：环形图书馆的灯光倒映在水面，教学楼、剧场与校园步道仍亮着灯。非现实校园比例图。"><defs><radialGradient id="night-glow"><stop stop-color="#45918c" stop-opacity=".22"/><stop offset="1" stop-color="#163039" stop-opacity="0"/></radialGradient><linearGradient id="night-water" x2="1" y2="1"><stop stop-color="#173a47"/><stop offset="1" stop-color="#102a36"/></linearGradient><linearGradient id="library-wall" x2="0" y2="1"><stop stop-color="#61818b"/><stop offset="1" stop-color="#2a4855"/></linearGradient></defs>
 <ellipse cx="398" cy="226" rx="350" ry="167" fill="url(#night-glow)"/>${stars}<circle cx="641" cy="56" r="21" fill="${moon}" opacity=".9"/><circle cx="650" cy="49" r="19" fill="#15252e"/><path d="M470 65h46m-29 7h46M61 95h50m-35 7h52" stroke="#4b71805e" stroke-width="2" stroke-linecap="round"/>
 <ellipse cx="386" cy="277" rx="350" ry="121" fill="#1b333a"/><ellipse cx="384" cy="285" rx="340" ry="109" fill="#1d383c"/><path d="M97 294q155-95 292-25t245 19M330 351l73-156M198 209l59 117" stroke="#486060" stroke-width="16" fill="none" stroke-linecap="round" opacity=".8"/><path d="M94 294q155-95 292-25t245 19" stroke="#759385" stroke-width="1" fill="none" stroke-dasharray="3 10"/>
 <ellipse cx="275" cy="300" rx="151" ry="50" fill="url(#night-water)"/><path d="M160 293h45m-20 11h78m19-1h59m-120 17h98m-61 10h24m-126-14h24" stroke="#5a879177" stroke-width="1.3" stroke-linecap="round"/><path d="M210 278h108m-119 9h95m-71 13h80" stroke="#dbbd7566" stroke-width="2.3" stroke-dasharray="9 12"/>
 <g><ellipse cx="262" cy="225" rx="126" ry="39" fill="#0b1d28" opacity=".6"/><path d="M142 142v80c0 38 240 38 240 0v-80Z" fill="url(#library-wall)"/><ellipse cx="262" cy="142" rx="120" ry="43" fill="#779399"/><ellipse cx="262" cy="143" rx="85" ry="26" fill="#172e3a"/><ellipse cx="262" cy="149" rx="74" ry="20" fill="#304b53"/><ellipse cx="262" cy="150" rx="47" ry="11" fill="#1b363e"/><path d="M143 153c6 51 231 51 238 0M143 177c6 51 231 51 238 0M143 204c6 51 231 51 238 0" stroke="#9cb5b4" stroke-width="3" fill="none"/>
 ${Array.from({length:21},(_,i)=>{const x=150+i*11;const q=Math.sqrt(Math.max(0,1-((x-262)/120)**2));return `<path d="M${x} ${150+q*31}v58" stroke="${i%5===0?'#365964':i%3===0?'#82baa5':'#d0b780'}" stroke-width="5" opacity=".9"/>`;}).join('')}
 <path d="M256 216v40h26v-40" fill="#122d34" stroke="#abc6b0" stroke-width="1"/><text x="266" y="210" font-size="8" fill="#e6d8ad" letter-spacing="3" text-anchor="middle">钱伟长图书馆</text><path d="M258 259h30l13 10h-55Z" fill="#749087"/></g>
 <g><path d="M422 143h123v109H422Z" fill="#345360"/><path d="M414 141h139v11H414" fill="#66818b"/><path d="M439 141v-27h86v27" fill="#3c5b66"/><path d="M435 112h95v8h-95" fill="#759195"/>${windows(434,163,6,4)}<path d="M472 216h25v39h-25Z" fill="#96b5a2"/><text x="483" y="135" text-anchor="middle" fill="#cfdfcc" font-size="9" letter-spacing="4">上海大学</text></g>
 <g><path d="M579 178h105v90H579Z" fill="#4b455b"/><path d="m571 179 61-37 61 37Z" fill="#75647b"/><path d="m586 174 46-26 47 26" fill="none" stroke="#ab8f98" stroke-width="2"/>${windows(591,191,5,2,18)}<path d="M615 233h32v35h-32Z" fill="#c7a17b"/><path d="M617 235h28v33h-28Z" fill="#694f50"/><text x="631" y="173" fill="#e5c8b3" font-size="9" letter-spacing="3" text-anchor="middle">伟长楼</text></g>
 <g transform="translate(507 296) rotate(7)"><rect width="112" height="59" rx="27" fill="#79535c"/><rect x="12" y="9" width="88" height="40" rx="19" fill="#416957"/><rect x="5" y="5" width="103" height="49" rx="23" fill="none" stroke="#b3bdb4" stroke-width="1"/><path d="M56 9v40M32 12v33h48V12" stroke="#a7c1ad" stroke-width="1" fill="none"/><circle cx="56" cy="29" r="8" fill="none" stroke="#a7c1ad"/></g>
 ${[[98,220,1],[399,198,.7],[89,285,.85],[352,308,.9],[449,310,.8],[694,253,.9],[702,298,.85],[558,239,.65],[407,355,.8],[194,365,.7],[309,372,.7],[121,325,.65]].map(v=>tree(...v)).join('')}
 ${[[117,277],[402,290],[496,282],[601,291],[346,344],[238,343],[554,341],[641,264]].map(v=>lamp(...v)).join('')}
 <g transform="translate(383 301)"><circle cy="-7" r="4" fill="#d9b090"/><path d="M-4-1h8l1 12H-5Z" fill="#bfa27b"/><path d="M-2 11v7M2 11v7" stroke="#9aaeb0" stroke-width="2"/></g><g transform="translate(397 307)"><circle cy="-7" r="4" fill="#d5ad8c"/><path d="M-4-1h8v12h-8Z" fill="#75bda2"/><path d="M-2 11v7M2 11v7" stroke="#9db3bc" stroke-width="2"/></g>
 <g transform="translate(74 354)"><path d="M0 5h61" stroke="#3e626a" stroke-width="1"/><text x="0" y="21" fill="#7cabb1" font-size="8" letter-spacing="3">SHANGHAI UNIVERSITY</text></g><g transform="translate(569 379)"><circle r="2.5" fill="#9eddb6"/><text x="10" y="3" fill="#95b7be" font-size="9" letter-spacing="2">每盏灯，都是一种可能</text></g></svg>`;
}

root.FourYearsArt={icon,portrait,campus};
})(window);
