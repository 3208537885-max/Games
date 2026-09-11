@echo off
chcp 65001 >nul
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 tools\serve.py --open
) else (
  python tools\serve.py --open
)
if errorlevel 1 (
  echo.
  echo 启动失败。也可以直接双击 index.html 或 standalone.html。
  pause
)
