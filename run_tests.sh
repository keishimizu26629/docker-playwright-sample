#!/bin/bash

# エラー時に停止
set -e

echo "=== Docker環境でのフロントエンドとPlaywrightテスト実行 ==="

echo "フロントエンドを起動中..."
docker compose up -d frontend

echo "フロントエンドの起動を待機中..."
sleep 10

echo "ヘルスチェック状態を確認..."
docker compose ps

echo "Playwrightテストを実行中..."
docker compose run --rm playwright npm test

echo ""
echo "テスト完了！"

# クリーンアップ（オプション）
# echo "コンテナを停止中..."
# docker compose down
