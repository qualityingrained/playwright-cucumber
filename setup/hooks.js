const playwright = require('playwright')
const { Before, After, BeforeAll, AfterAll, setDefaultTimeout} = require('@cucumber/cucumber')

BeforeAll(async () => {
    console.log('Launch browser')
    global.browser = await playwright['chromium'].launch({headless: true, slowMo: 0})
})

AfterAll(async () =>{
    console.log('Closing browser')
    await global.browser.close()
})

Before(async () => {
    //console.log('\nCreate new context and page')
    global.context = await global.browser.newContext()
    global.page = await global.context.newPage()
})

After(async () => {
    //console.log('\nClosing context and page')
    console.log('\n')
    await global.page.close()
    await global.context.close()
})

setDefaultTimeout(60000)