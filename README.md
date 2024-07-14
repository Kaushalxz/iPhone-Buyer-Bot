
# iPhone-Checkout-Bot
==============================================================================================================
# Puppeteer Script for Automating iPhone 15 Pro Purchase on Apple Website

This script uses Puppeteer along with the Stealth Plugin to automate the process of selecting and adding an iPhone 15 Pro to the cart on the Apple website. The script runs in non-headless mode and performs a series of actions such as selecting the model, color, storage capacity, and additional options before proceeding to the checkout page.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Additional Notes](#additional-notes)

## Introduction

This script is designed to automate the process of purchasing an iPhone 15 Pro on the Apple website. It navigates through various selections such as model, color, storage, and other options to add the desired iPhone to the shopping cart and proceed to the checkout page.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/puppeteer-iphone15.git
    cd puppeteer-iphone15
    ```

2. **Install the dependencies:**

    ```sh
    npm install puppeteer-extra puppeteer-extra-plugin-stealth
    ```

## Usage

1. **Run the script:**

    ```sh
    node script.js
    ```

2. **Script Breakdown:**

    - **Launch Browser:**

        ```javascript
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        ```

    - **Navigate to the iPhone 15 Pro page:**

        ```javascript
        await page.goto('https://www.apple.com/ie/iphone-15-pro/');
        ```

    - **Select the 'Buy' button:**

        ```javascript
        const buyButtonSelector = "a[data-analytics-title='buy | iphone 15 pro']";
        await page.waitForSelector(buyButtonSelector);
        await page.evaluate((buyButtonSelector) => document.querySelector(buyButtonSelector).click(), buyButtonSelector);
        ```

    - **Select iPhone model:**

        ```javascript
        const iPhoneSelector = "label[id=':r8:_label']";
        await page.waitForSelector(iPhoneSelector);
        await page.evaluate((iPhoneSelector) => document.querySelector(iPhoneSelector).click(), iPhoneSelector);
        ```

    - **Select color:**

        ```javascript
        const colorSelector = "img[src*='iphone-pro-finish-naturaltitanium-202309']";
        await page.waitForSelector(colorSelector);
        await page.evaluate((colorSelector) => document.querySelector(colorSelector).click(), colorSelector);
        ```

    - **Select storage capacity:**

        ```javascript
        const storageSelector = '.form-selector-title';
        await page.evaluate((storageSelector) => {
            const elements = Array.from(document.querySelectorAll(storageSelector));
            const targetElement = elements.find(elem => elem.textContent.includes('1TB'));
            if (targetElement) {
                targetElement.click();
            }
        }, storageSelector);
        ```

    - **Select trade-in option:**

        ```javascript
        const tradeInSelector = "label[for='noTradeIn']";
        await page.waitForSelector(tradeInSelector);
        await page.evaluate((tradeInSelector) => document.querySelector(tradeInSelector).click(), tradeInSelector);
        ```

    - **Select AppleCare option:**

        ```javascript
        const appleCareSelector = "label[for='applecareplus_59_noapplecare']";
        await page.waitForSelector(appleCareSelector);
        await page.evaluate((appleCareSelector) => document.querySelector(appleCareSelector).click(), appleCareSelector);
        ```

    - **Add to cart:**

        ```javascript
        const addToCart = "button[data-analytics-title='Add to Bag']";
        await page.waitForSelector(addToCart);
        await page.evaluate((addToCart) => document.querySelector(addToCart).click(), addToCart);
        ```

    - **Proceed to review bag:**

        ```javascript
        const reviewBagButtonSelector = "button[data-autom='proceed']";
        try {
            await page.waitForSelector(reviewBagButtonSelector, { timeout: 5000 });
            await page.click(reviewBagButtonSelector);
            console.log("Successfully clicked the 'Review Bag' button.");
        } catch (error) {
            console.error("Error clicking the 'Review Bag' button:", error);
        }
        ```

    - **Proceed to checkout:**

        ```javascript
        const checkOutSelector = "button[data-autom='checkout']";
        try {
            await page.waitForSelector(checkOutSelector, { timeout: 5000 });
            await page.click(checkOutSelector);
            console.log("Successfully clicked the 'Check Out' button.");
        } catch (error) {
            console.error("Error clicking the 'Check Out' button:", error);
        }
        ```

## Additional Notes

- Ensure you have the latest version of Node.js installed.
- The script is set to run in non-headless mode for better visibility of actions.
- The script uses the Stealth Plugin to avoid detection by the website's bot detection mechanisms.
>>>>>>> d0cdd0d (Create README.md)
