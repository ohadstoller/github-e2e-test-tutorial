const e2eGitHub = require('../utilities/e2eGithub')
const timeout = 8000000
const { userName, password } = require('../utilities/cred')

describe(
    'E2E test as an end-user, perform the tests below:',
    () => {
        let loggedPage;
        let page;

        beforeAll(
            async () => {
                try {
                    page = await browser.newPage();
                    await page.setViewport({ width: 1920, height: 1080 })
                    loggedPage = new e2eGitHub(page, userName, password, 'https://github.com/login')
                    await loggedPage.login();
                }
                catch (error) {
                    console.log(error);
                    throw error;
                }
            }, timeout
        );
        
        afterAll(
            async () => {
                await loggedPage.logout();
                await page.close()
            }, timeout
        );

        it("As an end-user, I can search for a sepcific repository, and receive a desired result",
            async () => {
                let repoName = 'React'
                await loggedPage.mainPage(repoName)
                const searchResultHeaderName = await loggedPage.getSearchResult()
                await expect(searchResultHeaderName).toBe(repoName)
            }, timeout
        );
    }, timeout
);
