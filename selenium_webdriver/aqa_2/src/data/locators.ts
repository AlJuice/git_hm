import {ILogin_Herokuapp, ILogin_karpovich, IRegistration_karpovich } from './interfaces'


export const locators_Herokuapp = {
    loginLinkSelector: 'a[href="/login"]', //a[@href="/login"]
    passwordInputSelector: '#password', //input[@id='password']
    usernameInputSelector: '#username', //input[@id='username']
    logInButtonSelector: 'button[type="submit"]', //button[@type='submit']
    loggedInNotificationSelector: '#flash', //*[@id='flash']
    logOutButtonSelector: 'a[href="/logout"]', //a[contains(@class, 'button')]
}

export const loginPageSelectors_Herokuapp: ILogin_Herokuapp = {
    title: 'h2',
    subheader: '.subheader', //*[@class='subheader']
    usernameLabel: 'label[for="username"]',
    passwordLabel: 'label[for="password"]',
    button: locators_Herokuapp.logInButtonSelector
}

export const loginPageSelectors_karpovich: ILogin_karpovich = {
    title: "#loginForm", //*[@id='loginForm']
    usernameInput: "#userName", //*[@id='userName']
    passwordInput: "#password", //*[@id='password']
    submitButton: "#submit", //*[@id='submit']
    registerButton: "#registerOnLogin", //*[@id='registerOnLogin']
    errorMessage: "#errorMessage", //*[@id='errorMessage']
    successMessage: '#successMessage', //*[@id='successMessage']
    backButton: '#backButton', //*[@id='backButton']
};

export const registrationPageSelectors_karpovich: IRegistration_karpovich = {
    title: "#registerForm", //*[@id='registerForm']
    usernameInput: "#userNameOnRegister", //*[@id='userNameOnRegister']
    passwordInput: "#passwordOnRegister", //*[@id='passwordOnRegister']
    registerButton: "#register", //*[@id='register']
    backButton: "#backOnRegister", //*[@id='backOnRegister']
    errorMessage: "#errorMessageOnRegister", //*[@id='errorMessageOnRegister']
};