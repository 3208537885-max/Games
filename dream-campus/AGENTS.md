# Instructions for contributors and coding agents

This folder is a self-contained, dependency-free static browser game. The Chinese user-facing handoff is `CODEX_HANDOFF.md`.

- For integration, deploy `dist/` or copy its contents to the existing host's static folder. Preserve the host's framework, dependencies, routes and global CSS. Prefer a direct link or iframe.
- Runtime scripts are ordered classic scripts, not ES modules, to preserve `file://` and single-file offline use. Do not introduce fetches or CDN dependencies without explicit permission.
- Edit source files, then run `python tools/build.py`. Do not maintain independent forks inside `dist/` or `standalone.html`.
- Content changes belong in `src/data.js` first. Simulation belongs in `src/game.js`; it must remain DOM-independent for Node tests. Art belongs in `src/art.js`/`renderer.js`.
- Preserve once-only reward transactions and room-boundary checkpoint semantics. Do not claim mid-fight resume.
- Keep gameplay RNG isolated from decorative RNG. Keep projectile, summon and particle caps.
- Run `node tests/core.test.cjs`; run `node tests/balance.cjs` for numerical changes. Browser QA results must disclose the tested transport/browser and any mocked storage.
- Do not replace original SVG art with unlicensed assets or attach font files. No telemetry, credentials, payment or tracking code.
- Public API is `window.DreamCampus`; docs are in `docs/ARCHITECTURE.md`. Keep backward compatibility or increment the save schema deliberately.
