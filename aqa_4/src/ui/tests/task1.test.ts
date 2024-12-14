
import {VALID_REGISTRATION_TEST_DATA, NEGATIVE_REGISTRATION_TEST_DATA, LOGIN_FORM_MESSAGES} from '../../data/login_form/register.data'

describe('[UI] Registration form', async function () {
    const usernameSelector = '#userNameOnRegister'
    const passwordSelector = '#passwordOnRegister'
    const registerButton =  "#register"
    const messageSelector = '#errorMessageOnRegister'
    const formSelector = '.registerForm'

    beforeEach(async function (){
        await browser.url('https://anatoly-karpovich.github.io/demo-login-form/')
        await $('#registerOnLogin').click()
    })

    afterEach(async function () {
        await browser.execute("window.localStorage.clear()");
    });

    context('Positive scenarios', async function (){
        VALID_REGISTRATION_TEST_DATA.forEach(({username, password, dataDescription, message}) => {
            it(`Should register with ${dataDescription}`, async function () {
                await $(usernameSelector).setValue(username)
                await $(passwordSelector).setValue(password)
                await $(registerButton).click()
                await expect($(messageSelector)).toHaveText(message)
            });
        })
    })

    context('Negative scenarios', async function (){
        NEGATIVE_REGISTRATION_TEST_DATA.forEach(({username, password, dataDescription, message}) => {
            it(`Should register with ${dataDescription}`, async function () {
                await $(usernameSelector).setValue(username)
                await $(passwordSelector).setValue(password)
                await $(registerButton).click()
                await expect($(messageSelector)).toHaveText(message)
            });
        })

        it('Should not register with 41 characters in username', async function (){
            // execute - команда запускающая внутри браузера 
            await browser.execute(async function (){
                const username = document.getElementById('userNameOnRegister')
                username?.removeAttribute('maxlength') // удаляем атрибут, который ограничивает длину инпута
            })
            // можно внутри формы искать остальные элементы
            // chaining elements 
            const form = $(formSelector)
            await form.$(usernameSelector).setValue("Alinaaaaaaaaaaaaaaaaaaaaaaaaaaaa123456789")
            await form.$(passwordSelector).setValue("Qwerty1234")
            await form.$(registerButton).click()
            await expect(form.$(messageSelector)).toHaveText(LOGIN_FORM_MESSAGES.FAILED.USERNAME_MORE_THAN_40)
        })

        it('Should not register with 21 characters in Password', async function (){
            await browser.execute(async function (){
                const username = document.getElementById('passwordOnRegister')
                username?.removeAttribute('maxlength') 
            })
            const form = $(formSelector)
            await form.$(usernameSelector).setValue("Alina")
            await form.$(passwordSelector).setValue("Qwerty123456789101135")
            await form.$(registerButton).click()
            await expect(form.$(messageSelector)).toHaveText(LOGIN_FORM_MESSAGES.FAILED.PASSWORD_MORE_THAN_20)
        })
    })
})

// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
