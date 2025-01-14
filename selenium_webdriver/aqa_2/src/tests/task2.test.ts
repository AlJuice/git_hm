import {
  loginPageSelectors_karpovich as loginPageSelectors,
  registrationPageSelectors_karpovich as registrationPageSelectors,
} from "../data/locators";
import { loginMessages_karpovich as loginMessages } from "../data/messages";
import { credentials_karpovich as credentials } from "../data/credentials";

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

    for (const  { username, password } of credentials.validCredentials) {
      it(`Should register with valid credentials: ${username}, password: ${password}`, async function ()  {
        await registerOrLoginUser(
          registrationPageSelectors.usernameInput,
          registrationPageSelectors.passwordInput,
          registrationPageSelectors.registerButton,
          username,
          password
        );

        await checkSelectorTextWithContain(
          registrationPageSelectors.errorMessage,
          loginMessages.registrationSuccess
        );
      });
    }
  });

  // -------------- LOGIN -------------- //
  describe("Login Page", () => {
    context("Positive scenarios", () => {
      for (const  { username, password } of credentials.validCredentials) {
        it(`Should login with valid credentials: ${username}, password: ${password}`, async function () {
          await registerOrLoginUser(
            loginPageSelectors.usernameInput,
            loginPageSelectors.passwordInput,
            loginPageSelectors.submitButton,
            username,
            password
          );

          await checkSelectorTextWithContain(
            loginPageSelectors.successMessage,
            loginMessages.loginSuccess,
            username
          );
        });
      }
    });

    context("Negative scenarios", () => {
      for (const  { username, password, message } of credentials.invalidCredentials) {
        it(`Should failed login with invalid credentials : ${username}, password: ${password}`, async function () {
          await registerOrLoginUser(
            loginPageSelectors.usernameInput,
            loginPageSelectors.passwordInput,
            loginPageSelectors.submitButton,
            username,
            password
          );

          await checkSelectorTextWithContain(
            loginPageSelectors.successMessage,
            message,
            username
          );
        });
      }
    });
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

async function checkSelectorTextWithContain(
  selector: string,
  message: string,
  data?: string
) {
  if (data) {
    expect((await $(selector).getText()).trim()).toContain(message + data);
  }
  expect(((await $(selector).getText())).trim()).toContain(message);
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
