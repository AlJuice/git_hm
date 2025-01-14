describe('[UI] [AQA course] Smoke test', async function () {
    const emailSelector = '#emailinput'
    const passwordSelector = '#passwordinput'
    const loginButtonSelector =  'button[type="submit"]'
    const iconUser = '#dropdownUser1'
    const spinnerSelector = '.spinner-border'

    const validCredentials = {
        email: 'aqacourse@gmail.com',
        password: 'password'
    }

    beforeEach(async function (){
        await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#')
    })

    it(`Should check all spinners`, async function () {
        await $(emailSelector).setValue(validCredentials.email)
        await $(passwordSelector).setValue(validCredentials.password)
        await $(loginButtonSelector).click()
        
        // setTimeout(function() {debugger;}, 0) // дебаггер для того чтобы отловить что-то на фронте
        const spinners = await $$(spinnerSelector).getElements()
        await browser.waitUntil(async () => {
            const result = await spinners.every(async (spinner) => !(await spinner.isDisplayed()))
            console.log(result)
            return result
        },
        { 
            timeout: 30000, 
            timeoutMsg: "Spinners hadn't disappeared in 30 sec on Home Page",
            interval: 500
        })

        await $(iconUser).waitForDisplayed()
        await expect($(iconUser)).toHaveText('AQA User')
    })
})

// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
//  - проверить исчезновение ВСЕХ спиннеров с помощью waitUntil метода
//  - проверить действительно ли пользователь с логином AQA User вошел в систему
