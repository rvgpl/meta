import type { CheerioAPI } from 'cheerio';

type MetaTags = {
  title: string;
  description: string;
};

const getMetaTags = async ($: CheerioAPI): Promise<MetaTags> => {
  const title = $('title').text() || '';
  const description =
    $('meta[name="description"]').attr('content') || '';

  return { title, description };
};

export { getMetaTags };
