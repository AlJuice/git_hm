
import {loginPageSelectors_karpovich as loginPageSelectors, registrationPageSelectors_karpovich as registrationPageSelectors} from '../data/locators'
import {loginMessages_karpovich as loginMessages} from '../data/messages'
import {credentials_karpovich as credentials} from '../data/credentials'

describe("[UI] Login Smoke tests", () => {
  before(async function () {
    await browser.maximizeWindow();
  });

  beforeEach(async function () {
    await browser.url("https://anatoly-karpovich.github.io/demo-login-form/");
  });

  afterEach(async function () {
    await browser.execute("window.localStorage.clear()"); 
  });

  // -------------- REGISTRATION -------------- //
  describe("Registration Page", () => {
    beforeEach(async function () {
      await $(loginPageSelectors.registerButton).click();
    });

    it("Should register with valid credentials", async function () {
      for (const cred of credentials.validCredentials){
        it(`${cred.username, cred.password}`, async () => {
          await registerOrLoginUser(
            registrationPageSelectors.usernameInput,
            registrationPageSelectors.passwordInput,
            registrationPageSelectors.registerButton,
            cred.username,
            cred.password
          );

          await checkSelectorTextWithContain(
            registrationPageSelectors.errorMessage,
            loginMessages.registrationSuccess
          );
        })
      }
    });
  });

  // -------------- LOGIN -------------- //
  describe("Login Page", () => {
    context("Positive scenarios", () => {
      it("Should login with valid credentials", async function () {
        for (const cred of credentials.validCredentials){
          it(`${cred.username, cred.password}`, async () => {
            await registerOrLoginUser(
              loginPageSelectors.usernameInput,
              loginPageSelectors.passwordInput,
              loginPageSelectors.submitButton,
              cred.username,
              cred.password)
          
            await checkSelectorTextWithContain(loginPageSelectors.successMessage, 
                                               loginMessages.loginSuccess, 
                                               cred.username)
            })
          }
      });
    })

    context("Negative scenarios", () => {
      it("Should failed login with invalid credentials", async function () {
        for (const cred of credentials.invalidCredentials){
          it(`${cred.username, cred.password, cred.message}`, async () => {
            await registerOrLoginUser(
              loginPageSelectors.usernameInput,
              loginPageSelectors.passwordInput,
              loginPageSelectors.submitButton,
              cred.username,
              cred.password)
          
            await checkSelectorTextWithContain(loginPageSelectors.successMessage, 
                                               cred.message, 
                                               cred.username)
            })
          }
      });
    })
  });
});

async function registerOrLoginUser(
  usernameSelector: string,
  passwordSelector: string,
  buttonSelector: string,
  username: string,
  password: string
) {
  await $(usernameSelector).setValue(username);
  await $(passwordSelector).setValue(password);
  await $(buttonSelector).click();
}

async function checkSelectorTextWithContain(selector: string, message: string, data?: string) {
    if (data) {
      expect(await $(selector).getText()).toContain(message + data);
    } 
    expect(await $(selector).getText()).toContain(message);
}

// Разработайте смоук тест-сьют с тестами на LOGIN на странице https://anatoly-karpovich.github.io/demo-login-form/
// Требования:
//   Страница регистрации:
//     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//   Страница логина:
//     Username: обязательное
//     Password: обязательное
// Добавьте в Task 2 степ, который удаляет из localStorage в браузере созданного пользователя в afterEach хуке
