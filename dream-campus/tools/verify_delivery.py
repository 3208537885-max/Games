#!/usr/bin/env python3
"""Verify relative deployment files and optional locally served HTTP responses."""
from pathlib import Path
import argparse, hashlib, json, re, urllib.request
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--base-url',default=None);args=parser.parse_args()
checks=[]
def check(name,ok):
    checks.append({'name':name,'pass':bool(ok)})
    print(('PASS ' if ok else 'FAIL ')+name)
index=(ROOT/'index.html').read_text(encoding='utf-8')
refs=re.findall(r'(?:src|href)="([^"]+)"',index)
refs=[p for p in refs if not p.startswith(('#','data:'))]
for ref in refs:
    file=ROOT/ref
    check('Relative runtime asset '+ref,not ref.startswith(('/', 'http:','https:')) and file.is_file())
    if file.is_file():check('dist mirrors source '+ref,(ROOT/'dist'/ref).read_bytes()==file.read_bytes())
    if args.base_url:
        try:
            with urllib.request.urlopen(args.base_url.rstrip('/')+'/'+ref,timeout=4) as response:
                data=response.read();mime=response.headers.get('Content-Type','')
                check('HTTP response bytes '+ref,response.status==200 and data==file.read_bytes())
                if ref.endswith('.js'):check('HTTP JavaScript is not HTML '+ref,'javascript' in mime)
        except Exception as e:check('HTTP response '+ref+': '+str(e),False)
solo=(ROOT/'standalone.html').read_text(encoding='utf-8')
check('Standalone has no external script tags',not re.search(r'<script[^>]+src=',solo))
check('Standalone has no external stylesheet link',not re.search(r'<link[^>]+rel="stylesheet"',solo))
check('Standalone embeds original cover', 'data:image/svg+xml;base64,' in solo)
check('Standalone contains both engine and API', 'class Game{' in solo and 'window.DreamCampus=Object.freeze(api)' in solo)
check('Production default debug is false', 'debug: false' in (ROOT/'config.js').read_text(encoding='utf-8'))
required=['CODEX_HANDOFF.md','README.md','LICENSE','docs/ARCHITECTURE.md','docs/GAME_DESIGN.md','docs/CONTENT_CATALOG.md','docs/BALANCE.md','docs/KNOWN_LIMITATIONS.md','docs/DEPLOYMENT.md']
for name in required:check('Delivery includes '+name,(ROOT/name).is_file())
report={'passed':sum(c['pass'] for c in checks),'failed':sum(not c['pass'] for c in checks),'baseUrl':args.base_url,'checks':checks}
(ROOT/'tests/artifacts/delivery-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(f"{report['passed']} passed / {report['failed']} failed")
raise SystemExit(1 if report['failed'] else 0)
