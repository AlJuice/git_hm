describe('Test 2', () => {
    const linkSelector = (linkName: string) => `a[href="/${linkName}"]`

    before(async function() {
        await browser.maximizeWindow()
        await browser.url('https://the-internet.herokuapp.com/')
    })

    it('Should wait for the element with text', async function () {
        await waitForElementWithText(linkSelector("dynamic_controls"), 'Dynamic Controls', 5000)
    })
})

async function waitForElementWithText(selector: string, text: string, timeout: number){
    const element = $(selector)

    await browser.waitUntil(async () => {
        const isVisible = await element.isDisplayed()
        const isTextCorrect =  (await element.getText()).trim() === text
        return isVisible && isTextCorrect
    },
    {
        timeout: timeout, 
        timeoutMsg: `Элемент с селектором "${selector}" либо не отображается, либо не содержит текст "${text}" спустя ${timeout} мс.`,
    })
}

// Task 2.
//  Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text) 
//  у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
//   - Использовать browser.waitUntil с комбинацией проверок (элемент виден и тест верный)
//   - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента
