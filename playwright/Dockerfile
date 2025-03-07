FROM node:20-alpine

WORKDIR /app

# 必要なツールをインストール
RUN apk add --no-cache curl chromium

# 環境変数を設定
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# テスト実行コマンド
CMD ["npm", "test"]
