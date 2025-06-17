require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');

const USERNAME = process.env.LT_USERNAME;
const ACCESS_KEY = process.env.LT_ACCESS_KEY;

const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    username: USERNAME,
    accessKey: ACCESS_KEY,
    platformName: 'Windows 10',
    build: 'POAP Passport Test',
    name: 'Passport Navigation Test',
    video: true,
    network: true,
    console: true,
    w3c: true,
    selenium_version: '4.0.0',
  }
};

const STEP_DELAY = 1500; // Puedes ajustar este valor para el tiempo de espera entre pasos

// Función reutilizable con delay
async function clickWithDelay(driver, selector) {
  const element = await driver.wait(until.elementLocated(selector), 10000);
  await driver.wait(until.elementIsVisible(element), 5000);
  await element.click();
  await driver.sleep(STEP_DELAY);
}

(async () => {
  const driver = await new Builder()
    .usingServer(`https://${USERNAME}:${ACCESS_KEY}@hub.lambdatest.com/wd/hub`)
    .withCapabilities(capabilities)
    .build();

  try {
    // Paso 1: Configurar el viewport
    await driver.manage().window().setRect({ width: 1363, height: 911 });
    await driver.sleep(STEP_DELAY);

    // Paso 2: Navegar al sitio
    await driver.get('https://passport.poap.studio/version-42bu8/collection/metamask-1/welcome');
    await driver.wait(until.titleContains('MetaMask'), 10000);
    await driver.sleep(STEP_DELAY);

    // Paso 3: Click en el primer elemento
    await clickWithDelay(driver, By.css('div.baTaMaKg div.clickable-element'));

    // Paso 4: Click en el campo de búsqueda (Email / ENS / ETH Address)
    await clickWithDelay(driver, By.css('#input_search'));
    await driver.findElement(By.css('#input_search')).sendKeys('cuchipando.eth');
    await driver.sleep(STEP_DELAY);

    // Paso 5: Click en el grupo de la etiqueta
    await clickWithDelay(driver, By.css('div.baTaLaTaG > div.Group'));

    // Paso 6: Cambiar valor del input
    await driver.findElement(By.css('#input_search')).clear();
    await driver.findElement(By.css('#input_search')).sendKeys('cuchipando.eth');
    await driver.sleep(STEP_DELAY);

    // Paso 7: Click en el botón "Start"
    await clickWithDelay(driver, By.css('#button_start font'));

    // Paso 8: Click en la entrada 6 (imagen)
    await clickWithDelay(driver, By.css('div.entry-6 img'));

    // Paso 9: Click en "Locked0/20"
    await clickWithDelay(driver, By.css('div.entry-5 div.baTaWaTp0'));

    // Paso 10: Click en el grupo de la entrada 9
    await clickWithDelay(driver, By.css('div.baTaMaGaT div.entry-9 > div.clickable-element > div.Group'));

    // Paso 11: Click en "UnlockedLEVEL 4"
    await clickWithDelay(driver, By.css('div.baTaMaGaS div.entry-1 > div > div.Group'));

    // Paso 12: Click en el div de clase baTaLaHx
    await clickWithDelay(driver, By.css('div.baTaLaHx > div'));

    // Paso 13: Click en "Get directions"
    await clickWithDelay(driver, By.css('div.baTaLaGd font'));

    await driver.sleep(3000);
    console.log("✅ Test ejecutado con éxito");
    await driver.executeScript('lambda-status=passed');
  } catch (err) {
    console.error("❌ Error en la ejecución:", err);
    await driver.executeScript('lambda-status=failed');
  } finally {
    await driver.quit();
  }
})();
