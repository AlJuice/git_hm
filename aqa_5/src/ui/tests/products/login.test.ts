// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import homePage from "../../pages/home.page"
import LoginPage from "../../pages/login.page"
import { VALID_CREDENTIALS } from "../../../data/credentials";

describe('[UI] [AQA course] Sign in', async function () {
    beforeEach(async function (){
        await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#')
    })

    it(`Should sign in with valid credentials`, async function () {
        await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#')
        await LoginPage.fillCredentials(VALID_CREDENTIALS.EMAIL, VALID_CREDENTIALS.PASSWORD)
        await LoginPage.clickOnLoginButton()
        await homePage.waitForPageOpened()
    }) 
})

