const puppeteer = require('puppeteer');
const id = process.env.ID;
const password = process.env.PASSWORD;
const loop = parseInt(process.env.LOOP) || 1;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://ssl2.excite.co.jp/idc/login/?ru=https%3A%2F%2Fbb.excite.co.jp%2Fexmb%2Fcoupon%2Fcharge%2F', {
    waitUntil: 'networkidle2',
  });

  await page.type('input[name=loginid]', id);
  await page.type('input[name=password]', password);
  await page.click('button[name=_submit]');

  for (let i = 0; i < loop; i++) {
    await page.waitForSelector('input[name=_confirm');
    await page.click('input[name=_confirm');

    await page.waitForSelector('input[name=_apply]');
    await page.click('input[name=_apply]');

    await page.goto('https://bb.excite.co.jp/exmb/coupon/charge/');
  }

  await browser.close();
})();
