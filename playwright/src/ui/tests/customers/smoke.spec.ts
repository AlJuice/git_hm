import test from "@playwright/test";

test.describe('[UI] [Customers] [Add new Customer]', async () => {
    test('Should create new customer with valid data', async function ({ page}) {
        await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/')

        await page.getByPlaceholder('Enter password').fill('aqacourse@gmail.com')
        await page.getByPlaceholder('Enter a valid email address').fill('password')
        await page.getByText('Login', {exact: true}).click()
        await page.waitForTimeout(5000)

        await page.getByRole('listitem').filter({ hasText: 'Customers'}).click()
        await page.locator('.spinner-border').waitFor({ state: 'hidden'})

        await page.locator('.page-title-button').click()
        await page.locator('#inputName').fill('Test')
        await page.locator('#inputEmail').fill('Test' + Date.now() + '@gmail.com')
        await page.locator('select#inputCountry').selectOption('France')
    })

})