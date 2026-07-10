@echo off
cd /d "%~dp0"
start "TypeMap-Helfer" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0start-typemap-api.ps1"
powershell.exe -NoProfile -Command "$limit=(Get-Date).AddSeconds(15); do { try { Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:7319/api/typemap/version' -TimeoutSec 1 | Out-Null; exit 0 } catch { Start-Sleep -Milliseconds 250 } } while ((Get-Date) -lt $limit); exit 1" >nul 2>&1
start "" "http://127.0.0.1:7319/typemap/"
