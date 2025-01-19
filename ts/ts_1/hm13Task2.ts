function validatePassword (password: string) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    if (password.length >= 8){
        const hasNoSpaces = password.trim() === password
        const hasNumbers = [...password].some(el => !Number.isNaN(+el))
        const hasLowercase = [...password].some(el => alphabet.includes(el))
        const hasUppercase = [...password].some(el => alphabet.toUpperCase().includes(el))

        if(!hasNumbers ||!hasLowercase ||!hasUppercase || !hasNoSpaces) {
            return false
        }
        return true
    }
    else {
        throw new Error('Password must be at least 8 characters long')
    }
}

console.log(validatePassword("Password123"))
console.log(validatePassword(" Password123 "))
console.log(validatePassword("              "))
console.log(validatePassword("AAAAAAAAA"))
console.log(validatePassword("uuuuuuuuu"))
console.log(validatePassword("12352545364"))
// console.log(validatePassword("123"))
