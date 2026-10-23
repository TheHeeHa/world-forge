@echo off
setlocal
where node >nul 2>&1
if errorlevel 1 (
  echo World Forge needs Node.js installed.
  echo Download it from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
if not exist "%~dp0node_modules\.bin\vite.cmd" (
  echo Installing World Forge packages for the first launch...
  pushd "%~dp0"
  call npm install
  if errorlevel 1 (
    popd
    echo Installation did not finish. Check your internet connection and try again.
    pause
    exit /b 1
  )
  popd
)
start "" "http://127.0.0.1:5173/"
call "%~dp0node_modules\.bin\vite.cmd" --host 127.0.0.1
endlocal
