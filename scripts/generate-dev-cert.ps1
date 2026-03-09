param(
  [string[]]$Hosts
)

$repoRoot = Split-Path -Parent $PSScriptRoot
$certificateDirectory = Join-Path $repoRoot ".cert"
$certificatePath = Join-Path $certificateDirectory "dev-cert.pem"
$keyPath = Join-Path $certificateDirectory "dev-key.pem"
$projectRootPemPath = Join-Path $certificateDirectory "rootCA.pem"
$projectRootCrtPath = Join-Path $certificateDirectory "rootCA.crt"

$mkcertCommand = Get-Command mkcert -ErrorAction SilentlyContinue

if (-not $mkcertCommand) {
  $fallbackPaths = @(
    (Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\mkcert.exe"),
    (Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\FiloSottile.mkcert_Microsoft.Winget.Source_8wekyb3d8bbwe\mkcert.exe")
  )

  $fallbackExecutable = $fallbackPaths | Where-Object { Test-Path $_ } | Select-Object -First 1

  if ($fallbackExecutable) {
    $mkcertCommand = @{
      Source = $fallbackExecutable
    }
  }
  else {
    Write-Error "mkcert is not installed. Install mkcert first and run this script again."
    exit 1
  }
}

if (-not $Hosts -or $Hosts.Count -eq 0) {
  $networkHosts = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object {
      $_.IPAddress -ne "127.0.0.1" -and
      $_.IPAddress -notlike "169.254*" -and
      $_.PrefixOrigin -ne "WellKnown"
    } |
    Select-Object -ExpandProperty IPAddress -Unique

  $Hosts = @("localhost", "127.0.0.1", "::1") + $networkHosts
}

$Hosts = $Hosts | Where-Object { $_ } | Select-Object -Unique

New-Item -ItemType Directory -Force -Path $certificateDirectory | Out-Null

& $mkcertCommand.Source -install | Out-Null

if ($LASTEXITCODE -ne 0) {
  Write-Error "mkcert could not install the local development CA."
  exit $LASTEXITCODE
}

& $mkcertCommand.Source -cert-file $certificatePath -key-file $keyPath @Hosts

if ($LASTEXITCODE -ne 0) {
  Write-Error "mkcert could not generate a certificate for: $($Hosts -join ', ')"
  exit $LASTEXITCODE
}

$caRoot = & $mkcertCommand.Source -CAROOT
$rootCaPemPath = Join-Path $caRoot "rootCA.pem"

if (Test-Path $rootCaPemPath) {
  Copy-Item -Path $rootCaPemPath -Destination $projectRootPemPath -Force
  Copy-Item -Path $rootCaPemPath -Destination $projectRootCrtPath -Force
}

Write-Host ""
Write-Host "Development certificate created."
Write-Host "  Certificate: $certificatePath"
Write-Host "  Key:         $keyPath"
Write-Host "  Hosts:       $($Hosts -join ', ')"
Write-Host ""
Write-Host "To remove the Android security warning, the device must trust the mkcert root CA."
Write-Host "Copy this file to the phone or tablet and install it as a trusted certificate:"
Write-Host "  $projectRootCrtPath"
Write-Host ""
Write-Host "After that, restart 'npm run dev' and open the app again via https://<your-lan-ip>:5173."
