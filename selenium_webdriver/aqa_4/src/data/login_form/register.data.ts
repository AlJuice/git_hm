
interface ILoginFormTestData {
    username: string,
    password: string,
    dataDescription: string,
    message: string
}

export const LOGIN_FORM_MESSAGES = {
    SUCCESSFULLY_REGISTERES: 'Successfully registered! Please, click Back to return on login page',
    FAILED: {
        USERNAME_LESS_THAN_3: 'Username should contain at least 3 characters',
        USERNAME_MORE_THAN_40: "Username can't exceed 40 characters",
        USERNAME_IS_REQUIRED: 'Username is required',
        USERNAME_HAS_SPACE: 'Prefix and postfix spaces are not allowed is username',
        PASSWORD_MORE_THAN_20: "Password can't exceed 20 characters",
        PASSWORD_LESS_THAN_8: 'Password should contain at least 8 characters',
        PASSWORD_IS_REQUIRED: 'Password is required',
        PASSWORD_HAS_ONLY_UPPER_LETTERS: 'Password should contain at least one character in lower case',
        PASSWORD_HAS_ONLY_LOWER_LETTERS:'Password should contain at least one character in upper case',
    }
    
}

export const VALID_REGISTRATION_TEST_DATA: ILoginFormTestData[] = [
    {
        username: "Alina",          // smoke
        password: "Qwerty12345",
        dataDescription: 'smoke test',
        message: LOGIN_FORM_MESSAGES.SUCCESSFULLY_REGISTERES
    },
    {
        username: "Alin",          // critical path
        password: "Qwerty123",
        dataDescription: 'min valid data + 1',
        message: LOGIN_FORM_MESSAGES.SUCCESSFULLY_REGISTERES
    },
    {
        username: "ali",
        password: "Qwerty 1",
        dataDescription: 'min valid data',
        message: LOGIN_FORM_MESSAGES.SUCCESSFULLY_REGISTERES
    },
    {
        username: "alina12345678910111213141516171819202122",
        password: "Qwerty12345678910111",
        dataDescription: 'max value data',
        message: LOGIN_FORM_MESSAGES.SUCCESSFULLY_REGISTERES
    },
    {
        username: "alina1234567891011121314151617181920212",
        password: "Qwerty1234567891011",
        dataDescription: 'max value data - 1',
        message: LOGIN_FORM_MESSAGES.SUCCESSFULLY_REGISTERES
    }
]

export const NEGATIVE_REGISTRATION_TEST_DATA: ILoginFormTestData[] = [
    {
        username: "Al",
        password: "Qwerty123",
        dataDescription: 'min username - 1',
        message: LOGIN_FORM_MESSAGES.FAILED.USERNAME_LESS_THAN_3
    },
    {
        username: "",
        password: "Qwerty123",
        dataDescription: 'username is empty',
        message: LOGIN_FORM_MESSAGES.FAILED.USERNAME_IS_REQUIRED
    },
    {
        username: " ",
        password: "Qwerty123",
        dataDescription: 'username consists of only space',
        message: LOGIN_FORM_MESSAGES.FAILED.USERNAME_HAS_SPACE
    },
    {
        username: " Alina",
        password: "Qwerty123",
        dataDescription: 'username has prefix space',
        message: LOGIN_FORM_MESSAGES.FAILED.USERNAME_HAS_SPACE
    },
    {
        username: "Alina ",
        password: "Qwerty123",
        dataDescription: 'username has postfix space',
        message: LOGIN_FORM_MESSAGES.FAILED.USERNAME_HAS_SPACE
    },
    {
        username: "Alina",
        password: "Qwerty1",
        dataDescription: 'min password - 1',
        message: LOGIN_FORM_MESSAGES.FAILED.PASSWORD_LESS_THAN_8
    },
    {
        username: "Alina",
        password: "",
        dataDescription: 'password is empty',
        message: LOGIN_FORM_MESSAGES.FAILED.PASSWORD_IS_REQUIRED
    },
    {
        username: "Alina",
        password: " ",
        dataDescription: 'password consists of only space',
        message: LOGIN_FORM_MESSAGES.FAILED.PASSWORD_IS_REQUIRED
    },
    {
        username: "Alina",
        password: "QWERTY1234567",
        dataDescription: 'password consists of only upper letters',
        message: LOGIN_FORM_MESSAGES.FAILED.PASSWORD_HAS_ONLY_UPPER_LETTERS
    },
    {
        username: "Alina",
        password: "qwerty1234567",
        dataDescription: 'password consists of only lower letters',
        message: LOGIN_FORM_MESSAGES.FAILED.PASSWORD_HAS_ONLY_LOWER_LETTERS
    },
]
