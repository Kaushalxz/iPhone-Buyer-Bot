const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function run() {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
   // await page.setViewport({width: 1080, height: 1024});
    await page.goto('https://www.apple.com/ie/iphone-15-pro/');

    const buyButtomSelector = "a[data-analytics-title = 'buy | iphone 15 pro']";

    await page.waitForSelector(buyButtomSelector);
    await page.evaluate((buyButtomSelector) => document.querySelector(buyButtomSelector).click(), buyButtomSelector);

    const iPhoneSelector = "label[id=':r8:_label']";

    await page.waitForSelector(iPhoneSelector);
    await page.evaluate((iPhoneSelector) => document.querySelector(iPhoneSelector).click(), iPhoneSelector);

    const colourPhoneSelector =  "img[src*='iphone-pro-finish-naturaltitanium-202309']";

    await page.waitForSelector(colourPhoneSelector);
    await page.evaluate((colourPhoneSelector) => document.querySelector(colourPhoneSelector).click(), colourPhoneSelector);

    //Had problems getting correct selector for storage 
    const tbSelector = '.form-selector-title';
    await page.evaluate((tbSelector) => {
        const elements = Array.from(document.querySelectorAll(tbSelector));//Queries all elements containing tbSelector
        const targetElement = elements.find(elem => elem.textContent.includes('1TB')); //Targets element with 1TB
        if (targetElement){
            targetElement.click();
        }
    }, tbSelector);

    const TradeInOrNotSelector = "label[for='noTradeIn']";
    await page.waitForSelector(TradeInOrNotSelector);
    await page.evaluate((TradeInOrNotSelector) => document.querySelector(TradeInOrNotSelector).click(), TradeInOrNotSelector);

    const appleCareSelector = "label[for='applecareplus_59_noapplecare']";
    await page.waitForSelector(appleCareSelector);
    await page.evaluate((appleCareSelector) => document.querySelector(appleCareSelector).click(), appleCareSelector);

    const addToCart = "button[data-analytics-title='Add to Bag']"
    await page.waitForSelector(addToCart);
    await page.evaluate((addToCart) => document.querySelector(addToCart).click(), addToCart);

    //await page.goto('https://www.apple.com/ie/shop/buy-iphone/iphone-15-pro?ams=0&product=MU7J3ZD/A&step=attach');

    // const buttonType = '.button button-block button-super';
    // await page.evaluate((buttonType) => {
    //     const elements = Array.from(document.querySelectorAll(buttonType));//Queries all elements containing buttonType
    //     const targetElement = elements.find(elem => elem.textContent.includes('Review Bag')); //Targets element with Review Bag
    //     if (targetElement){
    //         targetElement.click();
    //     }
    // }, buttonType);

    //Had issue where the script was running too fast
    //The selector did not exist when the script calls for it
    try {
        const reviewBagButtonSelector = "button[data-autom='proceed']";
        await page.waitForSelector(reviewBagButtonSelector, { timeout: 5000 }); // Wait for the selector to appear
        await page.click(reviewBagButtonSelector);
        console.log("Successfully clicked the 'Review Bag' button.");//Success Message
    } catch (error) {
        console.error("Error clicking the 'Review Bag' button:", error);
        //Error Message
    }
    // Corrected selector for the "Check Out" button
    const checkOutSelector = "button[data-autom='checkout']"; // Corrected selector format
    try {
        await page.waitForSelector(checkOutSelector, { timeout: 5000 }); // Wait for the selector to appear
        await page.click(checkOutSelector); // Directly click the button without using page.evaluate
        console.log("Successfully clicked the 'Check Out' button."); // Success message
    } catch (error) {
        console.error("Error clicking the 'Check Out' button:", error); // Error message
}
}run();