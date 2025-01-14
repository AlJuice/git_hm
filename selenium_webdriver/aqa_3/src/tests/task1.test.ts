describe('Test 1', () => {
    // Динамический селектор для ссылок
    const linkSelector = (linkName: string) => `a[href="/${linkName}"]`

    const headerTextSelector = '[class="example"] h4'
    const removeButtonSelector = 'form#checkbox-example button' 
    const addButtonSelector = 'form#checkbox-example button'
    const messageSelector = 'form#checkbox-example #message'
    const checkboxSelector = 'form#checkbox-example input[type="checkbox"]' 

    before(async function() {
        await browser.maximizeWindow()
        await browser.url('https://the-internet.herokuapp.com/')
    })

    it('Should check the page Dynamic Controls', async function () {
        await $(linkSelector("dynamic_controls")).click()
        await $(removeButtonSelector).waitForDisplayed()
        await expect(await $(headerTextSelector).getText()).toBe('Dynamic Controls')
        await $(checkboxSelector).click()
        await expect($(checkboxSelector)).toBeChecked()
        await $(removeButtonSelector).click()
        await $(checkboxSelector).waitForDisplayed({reverse: true})
        await $(addButtonSelector).waitForDisplayed()
        await $(messageSelector).waitForDisplayed()

        // expect(await $(messageSelector).getText()).toBe("It's gone!")
        await expect($(messageSelector)).toHaveText("It's gone!")

        await $(addButtonSelector).click()
        await $(checkboxSelector).waitForDisplayed()
        await $(messageSelector).waitForDisplayed()

        // expect(await $(messageSelector).getText()).toBe("It's back!")
        await expect($(messageSelector)).toHaveText("It's back!")
    })
})

// Task 1.
// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!