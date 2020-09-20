const e2eGitHub = require('../utilities/e2eGithub')
const timeout = 8000000
const { userName, password } = require('../utilities/cred')

describe(
    'E2E test as an end-user, perform the tests below:',
    () => {
        let loginPage;
        let mainPage;
        let searchResultPage;

        beforeAll(
            async () => {
                try {
                    loginPage = await e2eGitHub.startTest('https://github.com/login', false)
                    mainPage = await loginPage.login(userName, password)
                }
                catch (error) {
                    console.log(error);
                    throw error;
                }
            }, timeout
        );
        it("As an end-user, I can search for a sepcific repository, and receive a desired result",
            async () => {
                let repoName = 'React'
                searchResultPage = await mainPage.searchAndGoToRepo(repoName)
                const searchResultHeaderName = await searchResultPage.getSearchResultName()
                await expect(searchResultHeaderName).toBe(repoName)
            }, timeout
        );
        afterAll(
            async () => {
                await e2eGitHub.endTest()
            }
        );
    }, timeout
);
