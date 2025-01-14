//   Xpath/CSS: элемент с id - ‘submit’
const xpathID = '//*[@id="submit"]' 
const cssID = '#submit'

//   Xpath/CSS: все элементы с классом ‘txt’ 
const xpathClass = '//*[@class="txt"]'
const cssClass = '.txt'

//   Xpath: первый элемент с классом ‘txt’
const xpathFirstClass = '//*[@class="txt"][1]'

//   Xpath: кнопку которая содержит текст: ‘Remove comment’
const xpathButtomWithText = '//button[.="Remove comment"]'

//   Xpath: первый элемент с классом ‘one’ 
const xpathFirstElWithClassOne = '(//*[contains(@class, "one")])[1]'

//   Xpath/CSS: элемент с атрибутом ‘multitag2’ и значением  ‘on’ 
const xpathElWithAttrr = '//*[@multitag2="on"]'
const cssElWithAttrr = '[multitag2="on"]'

//   Xpath/CSS: всех детей элемента ‘div’ с классом ‘content’ 
const xpathAllChildrenDiv = '//div/*[@class="content"]'
const cssAllChildrenDiv = 'div > .content'

//   CSS: все элементы ‘span’ и  ‘button’ с классом ‘content’ 
const cssEls = 'span, button .content' //span.content, button.content

//   Xpath: используя за основу селектор //*[@id='submit'] найти элемент body 
const xpathBody = '//*[@id="submit"]/ancestor::body' 







