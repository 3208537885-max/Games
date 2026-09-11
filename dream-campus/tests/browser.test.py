#!/usr/bin/env python3
"""Real Chromium UI tests. Offline set_content transport works in network-restricted CI.
The optional memory-backed Web Storage shim tests persistence transactions, not the
browser's native disk persistence. The first test also checks the no-storage fallback.
Requires Playwright only for QA; the game has zero runtime dependencies.
"""
from pathlib import Path
import os, sys
import json, time, argparse
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'tests/artifacts'
HTML=(ROOT/'standalone.html').read_text(encoding='utf-8')
SHIM='''window.DREAM_CAMPUS_CONFIG={debug:true};
Object.defineProperty(window,'localStorage',{configurable:true,value:{
_data:new Map(),getItem(k){return this._data.get(k)||null},
setItem(k,v){this._data.set(k,String(v))},removeItem(k){this._data.delete(k)},clear(){this._data.clear()}}});'''
results=[]; errors=[]
def record(name,condition,detail=''):
    ok=bool(condition);results.append({'name':name,'pass':ok,'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,detail)
    return ok

def boot(browser,width=1440,height=1080,touch=False,shim=True):
    context=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,has_touch=touch,is_mobile=touch)
    page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    prefix=SHIM if shim else 'window.DREAM_CAMPUS_CONFIG={debug:true};'
    page.set_content(HTML.replace('<script>\n','<script>\n'+prefix+'\n',1),wait_until='load');page.wait_for_timeout(250)
    return context,page

def screenshot(page,name):
    page.screenshot(path=str(OUT/name),full_page=True)

def check_layout(page,name):
    r=page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth})')
    record(name,max(r['scroll'],r['body'])<=r['width']+1,str(r))

with sync_playwright() as p:
    browser_path=os.environ.get('DREAM_CAMPUS_BROWSER')
    if not browser_path:
        candidates=['/usr/bin/chromium',r'C:\Program Files\Google\Chrome\Application\chrome.exe',r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe']
        browser_path=next((str(p) for p in candidates if Path(p).is_file()),None)
    launch_args=['--no-sandbox'] if sys.platform!='win32' else []
    browser=p.chromium.launch(executable_path=browser_path,headless=True,args=launch_args)
    ctx,page=boot(browser,shim=False)
    record('No-storage fallback boots and offers a playable game',page.evaluate("!!DreamCampus&&!__DC_DEBUG__.game.storage.available"))
    page.evaluate("DreamCampus.start({skipStory:true,seed:'FALLBACK'})");page.wait_for_timeout(150)
    record('No-storage fallback renders the arena',page.evaluate("DreamCampus.getState().mode==='playing'&&document.getElementById('fatal').hidden"));ctx.close()
    ctx,page=boot(browser)
    check_layout(page,'Desktop home has no horizontal overflow')
    record('Original cover SVG is decoded',page.locator('.hero-art img').evaluate('(e)=>e.complete&&e.naturalWidth>0'))
    screenshot(page,'home.png')
    page.locator('[data-action="character"][data-id="early"]').click();page.locator('#seed').fill('BROWSER-CAMPUS');page.locator('#startBtn').click()
    record('Start button enters the four-page prologue',page.evaluate("__DC_DEBUG__.game.mode==='story'&&__DC_DEBUG__.ui.storyPages.length===4"))
    for i in range(4):page.locator('[data-action="storyNext"]').click()
    page.wait_for_timeout(150);record('Prologue ends in the first chapter',page.evaluate("DreamCampus.getState().floor===1&&DreamCampus.getState().mode==='playing'"))
    screenshot(page,'start.png')
    x=page.evaluate('__DC_DEBUG__.game.player.x');page.keyboard.down('d');page.wait_for_timeout(220);page.keyboard.up('d')
    record('Keyboard WASD actually moves the character',page.evaluate('__DC_DEBUG__.game.player.x')>x+10)
    page.keyboard.press('2');page.wait_for_timeout(80);record('Weapon hotkeys switch slots',page.evaluate('__DC_DEBUG__.game.run.selected')==1)
    page.keyboard.press('Escape');t=page.evaluate('DreamCampus.getState().elapsed');page.wait_for_timeout(160)
    record('Escape pauses simulation and opens a modal',page.evaluate("DreamCampus.getState().mode==='paused'") and page.evaluate('DreamCampus.getState().elapsed')==t)
    page.locator('[data-action="resume"]').click();page.keyboard.press('m');record('Map hotkey opens the explored-room map',page.evaluate("__DC_DEBUG__.ui.panel==='map'"));screenshot(page,'map.png');page.keyboard.press('Escape')
    page.keyboard.press('Tab');record('Inventory hotkey opens the build screen',page.evaluate("__DC_DEBUG__.ui.panel==='inventory'"));screenshot(page,'inventory.png');page.keyboard.press('Escape')
    # Prepare a normal room; spawning and firing are real simulation, not static images.
    page.evaluate("__DC_DEBUG__.warp(0,1);__DC_DEBUG__.give('waterbook');__DC_DEBUG__.game.player.invuln=999")
    page.wait_for_timeout(1800)
    record('Combat room actually spawns a wave',page.evaluate('__DC_DEBUG__.game.enemies.length')>0)
    page.keyboard.press('f');page.wait_for_timeout(500)
    record('Autofire toggle creates real projectiles',page.evaluate('__DC_DEBUG__.game.bullets.some(b=>b.friendly)'))
    page.evaluate("document.getElementById('banner').hidden=true;document.getElementById('toasts').innerHTML='' ");screenshot(page,'combat.png')
    page.keyboard.press('f');page.evaluate("__DC_DEBUG__.game.offerRelics('浏览器测试')")
    record('Relic choice displays three unique options',page.locator('[data-action="relic"]').count()==3)
    screenshot(page,'relics.png');page.locator('[data-action="relic"]').first.click();record('Relic choice applies and resumes',page.evaluate("__DC_DEBUG__.game.run.relics.length===1&&__DC_DEBUG__.game.mode==='playing'"))
    page.evaluate("__DC_DEBUG__.game.offerWeapon('laptop')");page.wait_for_timeout(900);screenshot(page,'weapon.png');page.locator('[data-action="replace"][data-slot="0"]').click()
    record('Weapon replacement applies the selected item',page.evaluate("__DC_DEBUG__.game.run.inventory[0].id==='laptop'"))
    page.evaluate("let r=__DC_DEBUG__.game.run.floors[0].rooms.find(r=>r.type==='shop');__DC_DEBUG__.warp(0,r.id);__DC_DEBUG__.game.run.coins=300;__DC_DEBUG__.game.openShop()")
    screenshot(page,'shop.png');page.locator('[data-action="upgrade"][data-slot="0"]').click()
    record('Shop upgrade debits currency and persists +1',page.evaluate("__DC_DEBUG__.game.run.inventory[0].level===1&&__DC_DEBUG__.game.run.coins===270"))
    page.keyboard.press('Escape');page.evaluate("__DC_DEBUG__.game.returnToMenu()")
    record('Returning home exposes the checkpoint Continue button',page.locator('#continueBtn').is_visible());page.locator('#continueBtn').click()
    record('Continue reloads the room and the upgraded weapon',page.evaluate("__DC_DEBUG__.game.mode==='playing'&&__DC_DEBUG__.game.weapon.id==='laptop'&&__DC_DEBUG__.game.run.inventory[0].level===1"))
    page.evaluate("__DC_DEBUG__.game.returnToMenu()");page.locator('[data-action="catalog"]').click()
    record('Catalog initially contains all 62 implemented weapons',page.locator('.catalog-card').count()==62)
    page.locator('#catalogSearch').fill('地质');record('Catalog search filters actual content',0<page.locator('.catalog-card').count()<62);screenshot(page,'catalog.png');page.keyboard.press('Escape')
    page.locator('.home [data-action="settings"]').click();page.locator('[data-setting="music"]').uncheck()
    record('Settings checkbox changes the live audio setting',page.evaluate('!__DC_DEBUG__.game.meta.settings.music'))
    page.keyboard.press('Escape');payload=page.evaluate('DreamCampus.exportSave()');page.evaluate('DreamCampus.importSave(DreamCampus.exportSave())')
    record('Save export/import transaction keeps a valid checkpoint',page.evaluate('__DC_DEBUG__.game.hasSave()'))
    # Add a public weapon via the supported extension API and remove test content.
    record('Public weapon API accepts a new definition',page.evaluate("(()=>{let w=DreamCampus.getContent().weapons.waterbook;w.id='testbook';w.name='扩展接口试验';const id=DreamCampus.registerWeapon(w);const ok=DreamCampus.getContent().weapons[id].name===w.name;delete DC.WEAPONS[id];return ok})()"))
    record('Public API rejects invalid definitions',page.evaluate("(()=>{try{DreamCampus.registerWeapon({id:'bad'});return false}catch(e){return true}})()"))
    page.evaluate("DreamCampus.start({seed:'FINAL-DEMO',skipStory:true});__DC_DEBUG__.warp(2,__DC_DEBUG__.game.run.floors[2].bossId);__DC_DEBUG__.give('fault')")
    record('Principal encounter opens its own boss introduction',page.evaluate("__DC_DEBUG__.game.mode==='bossIntro'"));screenshot(page,'boss-intro.png');page.locator('[data-action="bossBegin"]').click()
    page.evaluate('__DC_DEBUG__.game.player.invuln=999');page.wait_for_timeout(2600)
    page.evaluate("__DC_DEBUG__.game.boss.hp=__DC_DEBUG__.game.boss.maxHp*.29;__DC_DEBUG__.game.boss.cooldown=.1")
    page.wait_for_timeout(2600);record('Principal changes into the third phase',page.evaluate('__DC_DEBUG__.game.boss.stage')==3)
    page.evaluate("document.getElementById('banner').hidden=true;document.getElementById('toasts').innerHTML='' ");screenshot(page,'principal.png')
    page.evaluate('__DC_DEBUG__.game.killEnemy(__DC_DEBUG__.game.boss)');record('Boss defeat starts an actual victory animation',page.evaluate("__DC_DEBUG__.game.mode==='winning'"));page.wait_for_timeout(550);screenshot(page,'victory-effect.png');page.wait_for_timeout(1850)
    record('Victory reaches the three-page return-to-reality epilogue',page.evaluate("__DC_DEBUG__.game.mode==='victory'&&__DC_DEBUG__.ui.storyPages.length===3"));screenshot(page,'epilogue.png')
    for i in range(3):page.locator('[data-action="storyNext"]').click()
    record('Results show score, inspiration and graduation reward',page.locator('[data-action="certificate"]').is_visible());screenshot(page,'ending.png')
    record('Graduation reward is unlocked exactly once',page.evaluate("__DC_DEBUG__.game.meta.wins===1&&__DC_DEBUG__.game.meta.discovered.includes('diploma')"))
    page.evaluate("window.__certificate=null;__DC_DEBUG__.ui.download=(name,content,type)=>{window.__certificate={name,content,type}}")
    page.locator('[data-action="certificate"]').click()
    record('Certificate button generates a self-contained SVG',page.evaluate("__certificate?.content.startsWith('<svg')&&__certificate.content.includes('FINAL-DEMO')"))
    # Test certificate bytes, not system-level save dialogue (restricted in CI).
    certificate=page.evaluate('__certificate.content');(OUT/'sample-certificate.svg').write_text(certificate,encoding='utf-8')
    page.locator('[data-action="home"]').click();record('Ending returns to a working menu with graduation selection',page.locator('#graduateChoice').is_visible())
    check_layout(page,'Desktop final menu retains layout')
    page.evaluate('DreamCampus.destroy()');record('Destroy API stops and removes debug instance',page.evaluate("!window.__DC_DEBUG__"));ctx.close()
    for width,height,name in [(390,844,'mobile-portrait'),(844,390,'mobile-landscape')]:
        ctx,page=boot(browser,width,height,True);check_layout(page,name+' home overflow');screenshot(page,name+'-home.png')
        page.evaluate("DreamCampus.start({seed:'TOUCH',skipStory:true,character:'early'});__DC_DEBUG__.warp(0,1);__DC_DEBUG__.game.player.invuln=999")
        page.wait_for_timeout(1500);record(name+' displays both touch joysticks',page.locator('#moveStick').is_visible() and page.locator('#aimStick').is_visible());check_layout(page,name+' arena overflow');screenshot(page,name+'.png')
        # Real browser pointer capture with an active touch pointer through CDP.
        cdp=ctx.new_cdp_session(page);r=page.locator('#moveStick').bounding_box();x=r['x']+r['width']/2;y=r['y']+r['height']/2
        before=page.evaluate('__DC_DEBUG__.game.player.x')
        cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
        cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+22,'y':y,'id':1}]});page.wait_for_timeout(250)
        cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
        record(name+' touch joystick changes player position',page.evaluate('__DC_DEBUG__.game.player.x')>before+5)
        page.locator('[data-touch="skill"]').tap();page.wait_for_timeout(90);record(name+' touch skill button actually fires',page.evaluate('__DC_DEBUG__.game.player.skillCd')>0)
        page.evaluate("__DC_DEBUG__.game.offerRelics('触屏奖励测试')");screenshot(page,name+'-reward.png')
        record(name+' reward buttons remain reachable',all(v['width']>55 and v['height']>80 for v in page.locator('[data-action="relic"]').evaluate_all('(es)=>es.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))')))
        ctx.close()
    browser.close()
record('No uncaught JavaScript errors in tested browser paths',not errors,'; '.join(errors))
report={'generatedAt':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'transport':'Offline standalone HTML via Playwright set_content; real Chromium canvas/DOM/input/audio; browser disk persistence replaced by a documented in-memory Web Storage shim except the fallback test.','passed':sum(t['pass'] for t in results),'failed':sum(not t['pass'] for t in results),'errors':errors,'tests':results}
(OUT/'browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(f"\n{report['passed']} passed / {report['failed']} failed")
raise SystemExit(1 if report['failed'] else 0)
