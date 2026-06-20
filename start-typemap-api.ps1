$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { "node" }

# Ein bereits laufender Helfer wird wiederverwendet. So bleibt der Starter auch
# bei wiederholtem Doppelklick ruhig und erzeugt keinen zweiten Serverprozess.
try {
  $health = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:7319/typemap/" -TimeoutSec 1
  if ($health.StatusCode -eq 200) { exit 0 }
} catch {
  # Keine erreichbare Instanz: Der Helfer wird im nächsten Schritt gestartet.
}

Set-Location -LiteralPath $workspace
& $node (Join-Path $workspace "typemap-api-server.mjs")
