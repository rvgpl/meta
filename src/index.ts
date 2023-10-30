import { Elysia, t } from 'elysia';
import cheerio from 'cheerio';
import { getMetaTags } from './getMetaTags';
import { isValidUrl } from './utils';
import { getOGTags } from './getOgTags';
import { getSchemaTags } from './getSchemaTags';
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';

const app = new Elysia();

// @ts-ignore
app.use(html());

// @ts-ignore
app.use(staticPlugin());

app.onError(({ error }) => {
  return { error: error.toString() };
});

app.get('/ping', () => 'pong');

app.get('/', () => Bun.file('./public/index.html'));

app.get(
  '/v1/meta',
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
          const ogTags = await getOGTags(ch);
          const schemaInfo = await getSchemaTags(ch);

          return {
            meta: metaTags,
            openGraph: ogTags,
            schema: schemaInfo,
          };
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

app.listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});
