const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:6969/context-secrets');
});

describe('ContextSecrets', () => {

  test('secrets are not exposed to the client context', async () => {
    const element = await page.$('[data-secrets]');
    expect(element).toBeFalsy();
  });

  test('keys starting with NULLSTACK_SECRETS_ are read from the environment', async () => {
    const element = await page.$('[data-key="secrets"]');
    expect(element).toBeTruthy();
  });

  test('environment keys are camelized', async () => {
    const element = await page.$('[data-camelized-key="secrets"]');
    expect(element).toBeTruthy();
  });

  test('keys assigned to secrets stay in the context of development and production environments', async () => {
    const element = await page.$('[some-secret-value="someSecretValue"]');
    expect(element).toBeTruthy();
  });
  test('keys assigned to secrets stay in the context of development and production environments', async () => {
    const element = await page.$('[another-secret-value="anotherSecretValue"]');
    expect(element).toBeTruthy();
  });
});

afterAll(async () => {
  browser.close();
});