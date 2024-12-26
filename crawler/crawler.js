const puppeteer = require('puppeteer');
const { filterProductUrls } = require('../utils/filterUrls');

const discoverProductUrls = async (domain) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    await page.goto(`https://${domain}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map((a) => a.href)
        .filter(Boolean);
    });

    await browser.close();
    return filterProductUrls(links);
  } catch (error) {
    console.error(`Error crawling ${domain}:`, error.message);
    await browser.close();
    throw error;
  }
};

module.exports = { discoverProductUrls };
