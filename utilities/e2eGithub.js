const puppeteer = require("puppeteer");

class e2eGitHub {
    async startTest(domain, headlessStatus) {
        this.browser = await puppeteer.launch({ headless: headlessStatus, devtools: false });
        let page = await this.browser.newPage();
        page.setDefaultTimeout(1000 * 60 * 5);
        await page.setViewport({ width: 1920, height: 1080 })
        await page.goto(domain, { waitUntil: 'networkidle0' });
        return this.browseLoginPage(page)
    }
    async browseLoginPage(gitHubPage) {
        return {
            login: async (userName, password) => {
                await gitHubPage.waitForSelector('input[id=login_field]', { visible: true });
                await gitHubPage.type('input[id=login_field]', userName, { delay: 100 });
                await gitHubPage.waitForSelector('input[id=password]');
                await gitHubPage.type('input[id=password]', password, { delay: 100 });
                await gitHubPage.click('input[type="submit"]');
                return this.browseMainPage(gitHubPage);
            }
        }
    }
    async browseMainPage(gitHubPage) {
        return {
            searchAndGoToRepo: async (repoName) => {
                await gitHubPage.waitForSelector('input[name=q]');
                await gitHubPage.hover('input[name=q]');
                await gitHubPage.type('input[name=q]', repoName, { delay: 100 });
                await gitHubPage.keyboard.press('Enter');
                await gitHubPage.waitFor(7000)
                return this.browseSearchPage(gitHubPage);
            }
        }
    }
    async browseSearchPage(gitHubPage) {
        return {
            getSearchResultName: async () => {
                await gitHubPage.waitForSelector('h3[class=mb-1')
                const h3 = await gitHubPage.evaluate(el => el.innerHTML, await gitHubPage.$('h3[class=mb-1'))
                return h3
            }
        }
    }
    async endTest() {
        await this.browser.close();
    }

}
module.exports = new e2eGitHub  