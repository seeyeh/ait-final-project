const {By, Builder, Browser} = require('selenium-webdriver');

driver = new Builder().forBrowser(Browser.CHROME).build();
driver.get('http://localhost:3000/');
driver.manage().setTimeouts({implicit: 500});

let currentUrl = driver.getCurrentUrl();
console.log(`Before clicking start workout: ${currentUrl}`);
let startButton = driver.findElement(By.id('start-workout'));
startButton.click();
currentUrl = driver.getCurrentUrl();
console.log(`After clicking start workout: ${currentUrl}`);

driver.quit();