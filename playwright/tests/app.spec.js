// @ts-check
const { test, expect } = require('@playwright/test');

test('ページのタイトルが正しく表示されること', async ({ page }) => {
  // 直接URLを指定（エラー再現のため）
  await page.goto('http://frontend:8080/');

  // タイトルの確認
  await expect(page).toHaveTitle(/Web App Title/);
});

test('フォームラベルが正しく表示されること', async ({ page }) => {
  // 直接URLを指定（エラー再現のため）
  await page.goto('http://frontend:8080/');

  // 価格ラベルの確認
  const priceLabel = page.locator('label[for="price"]');
  await expect(priceLabel).toContainText('Item price (USD)');
});

test('コピーボタンが存在すること', async ({ page }) => {
  // 直接URLを指定（エラー再現のため）
  await page.goto('http://frontend:8080/');

  // コピーボタンの確認
  const copyButton = page.locator('#copy-button');
  await expect(copyButton).toHaveText('Copy');
});
