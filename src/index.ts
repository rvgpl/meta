import { Elysia, t } from 'elysia';
import cheerio from 'cheerio';
import { getMetaTags } from './getMetaTags';
import { isValidUrl } from './utils';

const app = new Elysia({ prefix: '/v1' });

app.onError(({ error }) => {
  return { error: error.toString() };
});

app.get('/ping', () => 'pong');

app.get(
  '/',
  async ({ query, set }) => {
    let html = null;

    if (query && query.url && isValidUrl(query.url)) {
      try {
        const response = await fetch(query.url);
        if (response.ok) {
          html = await response.text();
        }
      } catch (error) {
        set.status = 400;
        throw new Error(
          'Unable to fetch the URL. Is the URL correct?'
        );
      }

      if (html) {
        const ch = cheerio.load(html);
        try {
          const metaTags = await getMetaTags(ch);
          // await browser.close();
          return { meta: metaTags };
        } catch (error) {
          throw new Error('Failed to parse the given URL.');
        }
      }
    } else {
      set.status = 400;
      throw new Error(
        'The URL seems to not correct. Provide a valid URL in the request body.'
      );
    }
  },
  {
    response: {
      400: t.Object({ error: t.String() }),
    },
  }
);

app.listen(process.env.PORT ?? 4000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});
