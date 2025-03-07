FROM node:20-alpine

WORKDIR /app

# 必要なツールをインストール
RUN apk add --no-cache curl

# Vue CLIをグローバルにインストール
RUN npm install -g @vue/cli

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "serve"]
