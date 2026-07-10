$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { "node" }
$expectedHelperVersion = "20260621-hybrid-wikisource-1"

# Ein aktueller Helfer wird wiederverwendet. Ein veralteter TypeMap-Helfer wird
# gezielt ersetzt, damit neue lokale Import-Endpunkte sofort verfügbar sind.
try {
  $health = Invoke-RestMethod -Uri "http://127.0.0.1:7319/api/typemap/version" -TimeoutSec 1
  if ($health.version -eq $expectedHelperVersion) { exit 0 }
} catch {
  # Keine aktuelle Instanz; ein möglicher älterer Helfer wird unten geprüft.
}

try {
  $connection = Get-NetTCPConnection -LocalAddress "127.0.0.1" -LocalPort 7319 -State Listen -ErrorAction Stop | Select-Object -First 1
  $process = Get-CimInstance Win32_Process -Filter "ProcessId = $($connection.OwningProcess)"
  if ($process.CommandLine -like "*typemap-api-server.mjs*") {
    Stop-Process -Id $connection.OwningProcess -Force
    Start-Sleep -Milliseconds 350
  }
} catch {
  # Kein alter TypeMap-Prozess auf dem Port.
}

Set-Location -LiteralPath $workspace
& $node (Join-Path $workspace "typemap-api-server.mjs")
