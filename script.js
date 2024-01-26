const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const sendEmail = require('./mailer');
const Config = require('./config');

async function checkAndSendEmail() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 3840, height: 2160 });

    await page.goto('https://aksis.iuc.edu.tr/');

    await page.type('#UserName', Config.username);
    await page.type('#Password', Config.password);

    await page.click('#btnLogin');


    await page.waitForSelector('.card-box.widget-user.bg-warning');
    await page.click('.card-box.widget-user.bg-warning');

    await page.waitForTimeout(1000);

    await page.goto('https://obs.iuc.edu.tr/OgrenimBilgileri/SinavSonuclariVeNotlar/Index/');

    await page.waitForTimeout(1000);

    const createButtons = await page.$$('#btn-create');

    if (createButtons.length > 0) {

        for (const button of createButtons) {
            await button.click();
            await page.waitForTimeout(1000); 

            await page.evaluate(() => {
                document.querySelectorAll(".panel-body").forEach((panel) => {
                    let radioButtons = panel.querySelectorAll("input[type='radio']");
                    if (radioButtons.length >= 3) {
                        radioButtons[2].checked = true;
                    }
                });
            });

            await page.click('form a.btn-success');
            await page.waitForTimeout(1000); 
        }

        await page.waitForTimeout(1000); 
        await page.goto('https://obs.iuc.edu.tr/OgrenimBilgileri/SinavSonuclariVeNotlar/Index/');
        
        await page.waitForTimeout(2000); 

        const screenshotPath = 'screenshot.png';
        await page.screenshot({ path: screenshotPath });

        
        await sendEmail(screenshotPath);
    }

    const trElements = await page.$$('#sinavSonucGrid tr');
    const trCount = trElements.length;

    const filePath = path.join(__dirname, 'trCount.txt');
    let previousTrCount = 0;

    
    if (fs.existsSync(filePath)) {
        previousTrCount = parseInt(fs.readFileSync(filePath, 'utf8'));
    }

    
    fs.writeFileSync(filePath, trCount.toString());

    console.log("trCount", trCount);
    console.log("previousTrCount", previousTrCount);

    
    if (trCount !== previousTrCount && trCount!== 0 && previousTrCount !== 0) {

        const screenshotPath = 'screenshot.png';
        await page.screenshot({ path: screenshotPath });

        
        await sendEmail(screenshotPath);
    }

    await browser.close();
};

module.exports = checkAndSendEmail;
