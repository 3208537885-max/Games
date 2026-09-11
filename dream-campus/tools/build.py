#!/usr/bin/env python3
"""Create a truly offline, single-file edition and a static deployment directory.
No third-party Python packages or Node build tools are required.
"""
from pathlib import Path
import base64
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]

def data_uri(path: Path) -> str:
    mime = 'image/svg+xml' if path.suffix == '.svg' else 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')

def build() -> Path:
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'styles.css').read_text(encoding='utf-8')
    html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
    scripts = re.findall(r'<script defer src="([^"]+)"></script>', html)
    html = re.sub(r'\s*<script defer src="[^"]+"></script>', '', html)
    # Inline scripts with `defer` would run BEFORE the body exists. Append in order.
    combined = '\n;\n'.join((ROOT / path).read_text(encoding='utf-8') for path in scripts)
    combined = re.sub(r'</script', r'<\\/script', combined, flags=re.IGNORECASE)
    html = html.replace('</body>', '<script>\n' + combined + '\n</script>\n</body>')
    for asset in ('assets/favicon.svg', 'assets/key-art.svg'):
        html = html.replace(f'"{asset}"', f'"{data_uri(ROOT / asset)}"')
    result = ROOT / 'standalone.html'
    result.write_text(html, encoding='utf-8')
    dist = ROOT / 'dist'
    dist.mkdir(exist_ok=True)
    for filename in ('index.html', 'styles.css', 'config.js'):
        shutil.copy2(ROOT / filename, dist / filename)
    for dirname in ('src', 'assets'):
        shutil.copytree(ROOT / dirname, dist / dirname, dirs_exist_ok=True)
    print(f'Single-file edition: {result.name} ({result.stat().st_size:,} bytes)')
    print(f'Static deploy directory: {dist}')
    return result

if __name__ == '__main__':
    build()
