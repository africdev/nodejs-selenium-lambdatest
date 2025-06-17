require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

const STEP_DELAY = 1500; // Pausa entre pasos

// Función utilitaria para click con espera
async function clickWithDelay(driver, selector) {
  const element = await driver.wait(until.elementLocated(selector), 10000);
  await driver.wait(until.elementIsVisible(element), 5000);
  await element.click();
  await driver.sleep(STEP_DELAY);
}

// Función utilitaria para escribir en campos de texto
async function typeWithDelay(driver, selector, text) {
  const input = await driver.wait(until.elementLocated(selector), 10000);
  await driver.wait(until.elementIsVisible(input), 5000);
  await input.clear();
  await input.sendKeys(text);
  await driver.sleep(STEP_DELAY);
}

(async () => {
  const capabilities = {
  browserName: 'Safari',
  browserVersion: 'latest',
  'LT:Options': {
    username: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    platformName: 'macOS Ventura',
    resolution: '1024x768',
    build: 'WLMJ Mint Test',
    name: 'WLMJ BAD ETH Test - macOS Ventura - Safari - 1024x768',
    video: true,
    network: true,
    console: true,
    w3c: true,
    selenium_version: '4.0.0',
  }
};

  const driver = await new Builder()
    .usingServer(`https://${process.env.LT_USERNAME}:${process.env.LT_ACCESS_KEY}@hub.lambdatest.com/wd/hub`)
    .withCapabilities(capabilities)
    .build();

  try {
    // Paso 0: Navegar al sitio
    await driver.get('https://mint.poap.studio/version-72dgo/index-20/customdemoflow08');
    await driver.sleep(STEP_DELAY * 2);

    // Paso 1: Click en "I want this"
    await clickWithDelay(driver, By.css('#iwant font'));

    // Paso 2: Click para activar campo de ENS
    await clickWithDelay(driver, By.css('div.baTaPaHaL1'));

    // Paso 3: Escribir ENS erróneo
    await typeWithDelay(driver, By.css('#test'), 'cuchipando..eth');

    // Paso 4: Click en "Collect Now"
    await clickWithDelay(driver, By.css('div.baTaPaIaR1 font'));

    console.log("✅ Test ejecutado correctamente");
    await driver.executeScript('lambda-status=passed');
  } catch (err) {
    console.error("❌ Test falló:", err.message);
    await driver.executeScript('lambda-status=failed');
  } finally {
    await driver.quit();
  }
})();
