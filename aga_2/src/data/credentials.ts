
export const credentials_Herokuapp = {
    valid: {
        userName: 'tomsmith',
        password: 'SuperSecretPassword!',
    },
    invalid: {
        userName: 'invalid_user',
        password: 'wrong_password'
    }
}


export const credentials_karpovich = {
    validCredentials: [{
            username: "Alina",
            password: "Qwerty12345"
        },
        {
            username: "ali",
            password: "Qwerty12"
        },
        {
            username: "alina12345678910111213141516171819202122",
            password: "Qwerty12345678910111",
    }],
    invalidCredentials: {
        username: {
          lessMinLength: "Al",
          withSpaces: " Alina ",
          isSpace: "",
        },
        password: {
          lessMinLength: "1234567",
          isSpace: "",
          withoutLetters: "123456789",
          withoutUpperLetter: "qwerty1234567",
          withoutLowerLetter: "QWERTY1234567",
        },
    }
}
