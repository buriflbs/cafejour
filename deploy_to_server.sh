#!/bin/bash
# ==============================================================================
# Cafe Jour - Automated Production Deployment Script to Remote Server
# Usage: ./deploy_to_server.sh <SERVER_IP> [SSH_PORT] [SSH_USER]
# ==============================================================================
set -e

SERVER_IP="${1:-$SERVER_IP}"
SSH_PORT="${2:-22}"
SSH_USER="${3:-root}"

if [ -z "$SERVER_IP" ]; then
  echo "❌ Hata: Lütfen hedef sunucu IP adresini belirtin."
  echo "Kullanım: ./deploy_to_server.sh <SERVER_IP> [PORT] [USER]"
  echo "Örnek:   ./deploy_to_server.sh 178.254.22.30 22 root"
  exit 1
fi

echo "=============================================================="
echo "🚀 Cafe Jour Canlı Sunucuya Dağıtılıyor: ${SSH_USER}@${SERVER_IP}:${SSH_PORT}"
echo "=============================================================="

# 1. Zip dosyasını kontrol et
if [ ! -f "cafejour-production.zip" ]; then
  echo "📦 cafejour-production.zip oluşturuluyor..."
  npm run build
  cp -r public .next/standalone/
  cp -r .next/static .next/standalone/.next/
  cd .next/standalone && zip -q -r ../../cafejour-production.zip . && cd ../..
fi

# 2. Sunucuya yükle
echo "📤 Üretim paketi sunucuya kopyalanıyor..."
scp -P "${SSH_PORT}" cafejour-production.zip "${SSH_USER}@${SERVER_IP}:/tmp/cafejour-production.zip"

# 3. Sunucuda aç ve servisi başlat
echo "⚙️ Sunucu üzerinde kurulum yapılıyor..."
ssh -p "${SSH_PORT}" "${SSH_USER}@${SERVER_IP}" << 'ENDSSH'
set -e
TARGET_DIR="/var/www/vhosts/cafejour.ch/httpdocs"
mkdir -p "${TARGET_DIR}"
cd "${TARGET_DIR}"

unzip -o /tmp/cafejour-production.zip >/dev/null
rm -f /tmp/cafejour-production.zip
chown -R cafejour_usr:psacln "${TARGET_DIR}"

# PM2 servisini httpdocs dizininde yeniden başlat
PORT=3010 HOSTNAME="0.0.0.0" pm2 restart cafejour --cwd "${TARGET_DIR}" || PORT=3010 HOSTNAME="0.0.0.0" pm2 start server.js --name cafejour --cwd "${TARGET_DIR}"
pm2 save

echo "✅ Node.js PM2 servisi 3010 portunda aktif edildi."
ENDSSH

echo "=============================================================="
echo "🎉 Dağıtım başarıyla tamamlandı!"
echo "🌐 Canlı Adres: https://www.cafejour.ch"
echo "=============================================================="
