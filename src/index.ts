import { Elysia, t } from 'elysia';

const app = new Elysia();

app.onError(({ error }) => {
  return { error: error.toString() };
});

app.listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});

app.get('/ping', () => 'pong');
