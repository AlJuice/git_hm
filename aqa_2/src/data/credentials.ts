
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

    invalidCredentials: [{
        username: "Al",
        password: "12345678",
        message: "Invalid credentials"
    },
    {
        username: "Alina",
        password: "1234",
        message: "Invalid credentials"
    },
    {
        username: " Alina ",
        password: "12345678",
        message: "Invalid credentials"
    },
    {   
        username: "",
        password: "",
        message: "Credentials are required"
    },
    { 
        username: "",
        password: "12345678",
        message: "Username is required"
    },
    {
        username: "Alina",
        password: "",
        message: "Password is required"
    },
    { 
        username: "Alina",
        password: "qwerty1234567",
        message: "Invalid credentials"
    },
    { 
        username: "Alina",
        password: "QWERTY1234567",
        message: "Invalid credentials"
    },
    { 
        username: "Alina",
        password: "123456789",
        message: "Invalid credentials"
    }]
}
