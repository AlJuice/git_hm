
import {LOGIN_MESSAGES_HEROKUAPP as loginMessages} from '../data/messages'
import {locators_Herokuapp as locators, loginPageSelectors_Herokuapp as loginPageSelectors} from '../data/locators'
import {ILogin_Herokuapp as ILogin} from '../data/interfaces'
import {loginPageData_Herokuapp as loginPageData} from '../data/data'
import {credentials_Herokuapp as credentials} from '../data/credentials'

describe('[UI] herokuapp Login', () => {

    before(async function() {
        await browser.maximizeWindow()
    })

    beforeEach(async function() {
        await browser.url('https://the-internet.herokuapp.com/')
        await $(locators.loginLinkSelector).click()
    })

    it("Should login with valid credentials", async function() {
        await $(locators.passwordInputSelector).setValue(credentials.valid.password)
        await $(locators.usernameInputSelector).setValue(credentials.valid.userName)
        await $(locators.logInButtonSelector).click()
        // Валидация, что успешно залоггинились
        const actualText = await $(locators.loggedInNotificationSelector).getText() // ' You logged into a secure area!\nx'
        expect(actualText).toContain(loginMessages.LOGIN_SUCCESS)
    })

    it('Should not login with invalid credentials', async function() {
        await $(locators.passwordInputSelector).setValue(credentials.invalid.password)
        await $(locators.usernameInputSelector).setValue(credentials.invalid.userName)
        await $(locators.logInButtonSelector).click()
        // Валидация, что логин зафейлился
        const actualText = await $(locators.loggedInNotificationSelector).getText() // ' Your username is invalid!\n×'
        expect(actualText).toContain(loginMessages.LOGIN_FAILED)
    });

    it('Should logout succesfully', async function() {
        await $(locators.passwordInputSelector).setValue(credentials.valid.password)
        await $(locators.usernameInputSelector).setValue(credentials.valid.userName)
        await $(locators.logInButtonSelector).click()
        await $(locators.logOutButtonSelector).click()
        // Валидация, что логоaут успешен
        const actualText = await $(locators.loggedInNotificationSelector).getText() // ' You logged into a secure area!\nx'
        expect(actualText).toContain(loginMessages.LOGOUT)
    })

    it('Visial Test - Should have valid login page layout', async function () {
        const actualData: ILogin = {
            title: await $(loginPageSelectors.title).getText(),
            subheader: await $(loginPageSelectors.subheader).getText(),
            usernameLabel: await $(loginPageSelectors.usernameLabel).getText(),
            passwordLabel: await $(loginPageSelectors.passwordLabel).getText(),
            button: (await $(loginPageSelectors.button).getText()).trim()
        }
        expect(actualData).toMatchObject({ ...loginPageData})
    })
})


// - Разработайте тест со следующими шагами:
//   1. Открыть страницу "https://the-internet.herokuapp.com/" используя browser.url()
//   2. Кликнуть по кнопке ссылке Form Authentication методом . click()
//   3. Ввести валидные username/password методом setValue()
//   4. Кликнуть Login
//   5. Завалидировать Заголовок и описание страницы, а также текст кнопки Logout
