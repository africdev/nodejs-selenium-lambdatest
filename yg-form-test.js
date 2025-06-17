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
    build: 'YG Web Test',
    name: 'Formulario YG automatizado',
    video: true,
    network: true,
    console: true,
    selenium_version: '4.0.0',
    w3c: true
  }
};

const runTest = async () => {
  const driver = await new Builder()
    .usingServer('https://' + USERNAME + ':' + ACCESS_KEY + '@hub.lambdatest.com/wd/hub')
    .withCapabilities(capabilities)
    .build();

  try {
    // Abrir página
    await driver.get('https://www.yellowglasses.es');
    await driver.sleep(2000);

    // Esperar hasta que desaparezca el overlay de carga
await driver.wait(until.elementIsNotVisible(
  driver.findElement(By.css('.page-load_eyes-animation'))
), 10000);


    // Navegar al formulario de contacto
    await driver.findElement(By.linkText('Contacto')).click();
    await driver.wait(until.urlContains('/contacto'), 5000);

    // Completar formulario
    await driver.findElement(By.id('Nombre-y-apellido')).sendKeys('Augustin Afric');
    await driver.findElement(By.id('Correo-electr-nico')).sendKeys('afric@yellowglasses.es');
    await driver.findElement(By.id('Numero-de-la-empresa')).sendKeys('12312312');
    await driver.findElement(By.id('Nombre-de-la-empresa-3')).sendKeys('YG');
    await driver.findElement(By.id('Cargo-o-rol-en-la-empresa')).sendKeys('PM');
    await driver.findElement(By.id('Fase-del-proyecto')).sendKeys('En marcha');
    await driver.findElement(By.id('Mensaje')).sendKeys('QA Testing');
    await driver.findElement(By.id('Preferencia-contacto')).sendKeys('Llamada');

    // Aceptar términos (checkbox)
    await driver.findElement(By.css('#Contact-4-Checkbox div')).click();

    // Enviar formulario
    await driver.findElement(By.css('#w-node-_058d1bf4-1cc1-cd6b-9652-509ba09970d9-442f08a3')).click();

    await driver.sleep(3000);
    console.log('✅ Test finalizado correctamente');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await driver.quit();
  }
};

runTest();
