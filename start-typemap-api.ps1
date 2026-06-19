$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { "node" }

Set-Location -LiteralPath $workspace
& $node (Join-Path $workspace "typemap-api-server.mjs")
