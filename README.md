# Docker 環境でのフロントエンドと Playwright の分離実行サンプル

このプロジェクトは、Docker 環境でフロントエンド（Vue CLI）と Playwright（E2E テスト）を別々のコンテナとして実行するためのサンプルコードです。

## 概要

フロントエンド開発と E2E テストを別々の Docker コンテナで実行することで、環境の分離と再現性の高いテストが可能になります。このリポジトリでは、Vue CLI ベースのフロントエンドと Playwright テストを別々のコンテナで実行する方法を示しています。

また、Docker 環境でのコンテナ間通信時に発生する可能性のある「Invalid Host Header」エラーの解決方法も含まれています。

## 環境情報

- Node.js: v20
- Vue CLI: v5.0.0
- Playwright: v1.40.0
- Docker Compose
- webpack-dev-server: v5.1.0（Vue CLI 内部で使用）

## フォルダ構成

```
docker-playwright-sample/
├── docker-compose.yml        # Docker Compose設定
├── frontend/                 # フロントエンドアプリケーション（Vue CLI）
│   ├── Dockerfile            # フロントエンド用Dockerfile
│   ├── package.json          # 依存関係
│   ├── public/               # 静的ファイル
│   ├── src/                  # ソースコード
│   │   ├── App.vue           # メインコンポーネント
│   │   └── main.js           # エントリーポイント
│   └── vue.config.js         # Vue CLI設定（allowedHosts設定あり）
├── playwright/               # Playwrightテスト環境
│   ├── Dockerfile            # Playwright用Dockerfile
│   ├── package.json          # 依存関係
│   ├── playwright.config.js  # Playwright設定
│   └── tests/                # テストコード
│       └── app.spec.js       # アプリケーションテスト
└── run_tests.sh              # テスト実行スクリプト
```

## 主な特徴

1. **環境の分離**: フロントエンドとテスト環境が別々のコンテナで動作
2. **コンテナ間通信**: Docker Compose ネットワークを使用したコンテナ間通信
3. **設定例**: Vue CLI と Playwright の設定例を提供
4. **トラブルシューティング**: 一般的な問題（Invalid Host Header など）の解決方法

## Docker Compose 設定

```yaml
version: "3.8"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 30s

  playwright:
    build:
      context: ./playwright
      dockerfile: Dockerfile
    depends_on:
      frontend:
        condition: service_healthy
    volumes:
      - ./playwright:/app
      - /app/node_modules
    environment:
      - PLAYWRIGHT_BASE_URL=http://frontend:8080
```

## 使用方法

### 環境構築

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/docker-playwright-sample.git
cd docker-playwright-sample
```

### テスト実行

```bash
# Docker Composeでテスト実行
docker compose up -d frontend
docker compose run --rm playwright npm test
```

または、提供されているスクリプトを使用：

```bash
# テスト実行スクリプト
./run_tests.sh
```

## 注意点とトラブルシューティング

### Invalid Host Header エラー

Docker 環境で Playwright テストを実行すると、webpack-dev-server がデフォルトで`frontend`というホスト名からのリクエストを拒否するため、「Invalid Host Header」エラーが発生する場合があります。

解決策として、`vue.config.js`に`allowedHosts`設定を追加します：

```javascript
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["frontend", "localhost", ".local"],
  },
};
```

### テストコードでの相対パス使用

テストコードでは、絶対 URL ではなく相対パスを使用することをお勧めします：

```javascript
// 推奨（相対パス）
await page.goto("/");

// 非推奨（絶対URL）
await page.goto("http://frontend:8080/");
```

## ライセンス

MIT
