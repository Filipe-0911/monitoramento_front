# Script para buildar a imagem Docker do frontend e enviar ao Docker Hub com a tag da branch atual

$ErrorActionPreference = "Stop"

# Detecta a branch atual do Git
$branch = (git rev-parse --abbrev-ref HEAD).Trim()

if ($branch -eq "dev" -or $branch -eq "desenvolvimento") {
    $tag = "dev"
} elseif ($branch -eq "master" -or $branch -eq "main") {
    $tag = "master"
} else {
    $tag = $branch -replace '[^a-zA-Z0-9_.-]', '-'
}

$imageName = "filipe0911/monitoramento_front_v1"

Write-Host "==> Branch detectada: $branch | Tag da imagem: ${imageName}:${tag}" -ForegroundColor Cyan

# 1. Builda a imagem diretamente pelo Dockerfile
Write-Host "==> Executando build da imagem Docker do frontend..." -ForegroundColor Cyan
docker build --build-arg VITE_LOGIN_API=/api -t "${imageName}:${tag}" .
if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha no build da imagem Docker! Push abortado."
    exit 1
}

# 2. Envia a imagem com a tag da branch para o Docker Hub
Write-Host "==> Enviando ${imageName}:${tag} para o Docker Hub..." -ForegroundColor Cyan
docker push "${imageName}:${tag}"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha ao enviar a imagem para o Docker Hub!"
    exit 1
}

# 3. Se for a branch master, também atualiza a tag :latest no Docker Hub
if ($tag -eq "master") {
    Write-Host "==> Branch master detectada: atualizando também ${imageName}:latest..." -ForegroundColor Cyan
    docker tag "${imageName}:${tag}" "${imageName}:latest"
    docker push "${imageName}:latest"
}

Write-Host "==> Imagem ${imageName}:${tag} publicada com sucesso!" -ForegroundColor Green
