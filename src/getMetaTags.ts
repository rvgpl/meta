import type { Page } from 'puppeteer';

const getMetaTags = async (page: Page) => {
  const metaTags = await page.evaluate(() => {
    const title = document.querySelector('title')?.textContent;
    const description = document
      .querySelector("meta[name='description']")
      ?.getAttribute('content');
    return { title, description };
  });
  return metaTags;
};

export { getMetaTags };
