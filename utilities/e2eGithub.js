const puppeteer = require("puppeteer");
const Page = require('./page.js');

module.exports = class e2eGitHub extends Page {

    constructor(page, userName, password, url) {
        super(page, userName, password, url)
    }

    async mainPage(repoName) {
        await this.page.waitForSelector('input[name=q]');
        await this.page.hover('input[name=q]');
        await this.page.type('input[name=q]', repoName, { delay: 100 });
        await this.page.keyboard.press('Enter');
        await this.page.waitFor(3000)
    }

    async getSearchResult() {
        await this.page.waitForSelector('h3[class=mb-1')
        const h3 = await this.page.evaluate(el => el.innerHTML, await this.page.$('h3[class=mb-1'))
        return h3
    }

}  