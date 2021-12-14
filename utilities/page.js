module.exports = class Page {

    constructor(page, userName, password, url) {
        this.page = page;
        this.userName = userName;
        this.password = password;
        this.url = url;
    }

    async login() {
        await this.page.goto(this.url);
        await this.page.waitForSelector('input[id=login_field]', { visible: true });
        await this.page.type('input[id=login_field]', this.userName, { delay: 100 });
        await this.page.waitForSelector('input[id=password]');
        await this.page.type('input[id=password]', this.password, { delay: 100 });
        await this.page.click('input[type="submit"]');
    }

    async logout() {
        await this.page.waitForSelector('.avatar-small');
        await this.page.click('.avatar-small');
        await this.page.waitForSelector('.dropdown-signout');
        await this.page.click('.dropdown-signout');
        await this.page.waitFor(1000);
    }

}