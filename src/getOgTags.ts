import type { CheerioAPI } from 'cheerio';

function getOGTags($: CheerioAPI) {
  const ogTags: Record<string, string> = {};

  $('meta').each((index, element) => {
    const property = $(element).attr('property') || '';
    const content = $(element).attr('content') || '';

    if (property && property.startsWith('og:')) {
      const normalizePropertyName = property.replace('og:', '');
      ogTags[normalizePropertyName] = content;
    }
  });

  return ogTags;
}

export { getOGTags };
