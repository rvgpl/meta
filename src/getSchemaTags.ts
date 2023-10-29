import type { CheerioAPI } from 'cheerio';

const getSchemaTags = ($: CheerioAPI) => {
  const schemaInfo: Record<string, string>[] = [];

  $('script[type="application/ld+json"]').each((_, element) => {
    const scriptContent = $(element).html();
    if (scriptContent) {
      try {
        const jsonData = JSON.parse(scriptContent);
        schemaInfo.push(jsonData);
      } catch (error) {
        console.error(
          'Error occurred while fetching schema.org tags:',
          error
        );
      }
    }
  });

  return schemaInfo;
};

export { getSchemaTags };
