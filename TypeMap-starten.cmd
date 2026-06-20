@echo off
cd /d "%~dp0"
start "TypeMap-Helfer" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0start-typemap-api.ps1"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:7319/typemap/"
