$ErrorActionPreference = "Stop"

$scriptTarget = Join-Path $PSScriptRoot "timemap.js"
$encodingTargets = @(
  $scriptTarget,
  (Join-Path $PSScriptRoot "timemap.html")
)

Write-Host "Checking syntax..." -ForegroundColor Cyan
node --check $scriptTarget

Write-Host "Checking common mojibake patterns..." -ForegroundColor Cyan
$fragments = @(
  [string][char]195,
  [string][char]194,
  [string][char]226
)
$pattern = ($fragments | ForEach-Object { [regex]::Escape($_) }) -join "|"
$matches = Select-String -Path $encodingTargets -Pattern $pattern

if ($matches) {
  Write-Host ""
  Write-Host "Suspicious encoding fragments found:" -ForegroundColor Yellow
  $matches | ForEach-Object {
    "{0}:{1}" -f $_.LineNumber, $_.Line.Trim()
  }
  exit 1
}

Write-Host "No common syntax or encoding problems found." -ForegroundColor Green
