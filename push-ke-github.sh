#!/bin/bash

# Pastikan URL GitHub diberikan
if [ -z "$1" ]; then
  echo "❌ Error: Masukkan link repository GitHub Anda."
  echo "👉 Cara penggunaan: ./push-ke-github.sh https://github.com/username/repo-anda.git"
  exit 1
fi

REPO_URL=$1

echo "🚀 Memulai proses push ke GitHub..."

# Inisialisasi git jika belum ada
if [ ! -d ".git" ]; then
  git init
  echo "✅ Git berhasil diinisialisasi."
fi

# Tambahkan semua file
git add .
echo "✅ Semua file telah ditambahkan."

# Buat commit
git commit -m "Initial commit atau update terbaru"
echo "✅ Commit berhasil dibuat."

# Ubah nama branch utama menjadi main (standar baru GitHub)
git branch -M main

# Cek apakah remote origin sudah ada
if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REPO_URL"
  echo "✅ Remote origin berhasil diperbarui ke $REPO_URL."
else
  git remote add origin "$REPO_URL"
  echo "✅ Remote origin berhasil ditambahkan dengan link $REPO_URL."
fi

# Push ke GitHub
echo "⏳ Sedang mem-push kode ke GitHub..."
if git push -u origin main; then
  echo "🎉 Berhasil! Kode Anda sudah ada di GitHub."
else
  echo "❌ Gagal mem-push ke GitHub. Pastikan link benar dan Anda sudah login ke Git di komputer ini."
fi
