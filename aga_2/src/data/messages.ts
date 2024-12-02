
export enum LOGIN_MESSAGES_HEROKUAPP {
    LOGIN_SUCCESS = 'You logged into a secure area!',
    LOGIN_FAILED = 'Your username is invalid!',
    LOGOUT = 'You logged out of the secure area!'
}

export const loginMessages_karpovich = {
    loginSuccess: "Hello, ",
    registrationSuccess: "Successfully registered! Please, click Back to return on login page",
    failed: {
        provideCredentials: "Please, provide valid data",
        invalidCredentials: "Invalid credentials",
        emptyCredentials: "Credentials are required",
        username: {
            empty: "Username is required",
            lessMinLength: "Username should contain at least 3 characters",
            isExisting: "Username is in use",
            withSpaces: "Prefix and postfix spaces are not allowed is username",
        },
        password: {
            empty: "Password is required",
            lessMinLength: "Password should contain at least 8 characters",
            withoutAnyLetters: "Password should contain at least one character in lower and one in upper case",
            withoutUpperLetter: "Password should contain at least one character in upper case",
            withoutLowerLetter: "Password should contain at least one character in lower case",
        },
    },
};

