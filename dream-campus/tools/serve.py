#!/usr/bin/env python3
"""Serve the game on loopback with the Python standard library only."""
from __future__ import annotations
import argparse
import functools
import http.server
from pathlib import Path
import threading
import webbrowser

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8787)
    parser.add_argument('--host', default='127.0.0.1', help='Use 0.0.0.0 explicitly for LAN play.')
    parser.add_argument('--open', action='store_true', help='Open the local game in your browser.')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
    try:
        server = http.server.ThreadingHTTPServer((args.host, args.port), handler)
    except OSError as exc:
        parser.exit(1, f'Cannot listen on {args.host}:{args.port}: {exc}\nTry --port 8788.\n')
    url = f'http://127.0.0.1:{args.port}/'
    print(f'Dream Campus: {url}\nRoot: {root}\nPress Ctrl+C to stop.')
    if args.open:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped.')
    finally:
        server.server_close()

if __name__ == '__main__':
    main()
