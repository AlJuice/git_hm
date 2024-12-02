
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
    browser.execute("window.localStorage.clear()"); 
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
      it("Should failed login with invalid credentials less min length", async function () {
        await registerOrLoginUser(
            loginPageSelectors.usernameInput,
            loginPageSelectors.passwordInput,
            loginPageSelectors.submitButton,
            credentials.invalidCredentials.username.lessMinLength,
            credentials.invalidCredentials.password.lessMinLength)
        
        await checkSelectorTextWithContain(loginPageSelectors.errorMessage, loginMessages.failed.invalidCredentials)
      });

      it("Should failed login with invalid empty credentials", async function () {
        await registerOrLoginUser(
            loginPageSelectors.usernameInput,
            loginPageSelectors.passwordInput,
            loginPageSelectors.submitButton,
            credentials.invalidCredentials.username.isSpace,
            credentials.invalidCredentials.password.isSpace)
        
        await checkSelectorTextWithContain(loginPageSelectors.errorMessage, loginMessages.failed.emptyCredentials)
      });

      it("Should failed register, cause username is empty", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст юзеру о том, чтоб необходимо ввести логин 
        // "Username is required"
        // Отображается текст: ""
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          credentials.invalidCredentials.username.isSpace,
          credentials.validCredentials[0].password
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.username.empty
        );
      });

      it("Should failed register, cause username is with prefix and postfix spaces", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст 
        // "Prefix and postfix spaces are not allowed is username"
        // Отображается текст: ""
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          credentials.invalidCredentials.username.withSpaces,
          credentials.validCredentials[0].password
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.username.withSpaces
        );
      });

      it("Should failed register, cause username and password consists with only spaces", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст 
        // "Invalid credentials",
        // Отображается текст: ""
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          credentials.invalidCredentials.username.isSpace,
          credentials.invalidCredentials.password.isSpace
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.invalidCredentials
        );
      });

      it("Should failed register, cause password is less min length", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст 
        // "Password should contain at least 8 characters"
        // Отображается текст: ""
        const validUsername = await generateUniqueValidCredentials(credentials.validCredentials[0].username)
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          validUsername,
          credentials.invalidCredentials.password.lessMinLength
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.password.lessMinLength
        );
      });

      it("Should failed register, cause password is empty", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст юзеру о том, чтоб необходимо ввести пароль 
        // "Password is required"
        // Отображается текст: ""
        const validUsername = await generateUniqueValidCredentials(credentials.validCredentials[0].username)
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          validUsername,
          credentials.invalidCredentials.password.isSpace
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.password.empty
        );
      });

      it("Should failed register, cause password without any upper letter", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст 
        //"Password should contain at least one character in upper case"
        // Отображается текст: ""
        const validUsername = await generateUniqueValidCredentials(credentials.validCredentials[0].username)
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          validUsername,
          credentials.invalidCredentials.password.withoutUpperLetter
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.password.withoutUpperLetter
        );
      });

      it("Should failed register, cause password without any lower letter", async function () {
        // Найден баг! 
        // Вместо того, чтобы показывать текст 
        // "Password should contain at least one character in lower case"
        // Отображается текст: ""
        const validUsername = await generateUniqueValidCredentials(credentials.validCredentials[0].username)
        await registerOrLoginUser(
          loginPageSelectors.usernameInput,
          loginPageSelectors.passwordInput,
          loginPageSelectors.registerButton,
          validUsername,
          credentials.invalidCredentials.password.withoutLowerLetter
        );

        await checkSelectorTextWithContain(
          loginPageSelectors.errorMessage,
          loginMessages.failed.password.withoutLowerLetter
        );
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

async function generateUniqueValidCredentials(data: string){
    return `${data} ${Date.now()}`
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
