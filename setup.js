const puppeteer = require('puppeteer');
const { browser } = require('./utilities/e2eGithub');
const timeout = 15000

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
}, timeout)

afterAll(async () => {
    await browser.close()
}, timeout)