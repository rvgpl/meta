<p align="center">
  <img src="logo.png" alt="Logo" height="90" />
</p>

[![MIT](https://img.shields.io/github/license/rvgpl/meta)](https://github.com/rvgpl/meta/blob/main/LICENSE) 

# Meta

Extract metadata from any website with an API call. The API allows fetching of metatags, open graph data and fonts used.

Built with [Elysia](https://elysiajs.com/) + [Puppeteer](https://pptr.dev/) with [Bun](https://bun.sh/) runtime


## Local Development
To get started, simply paste this command into your terminal to install the dependencies:

```sh
bun install
```

and to start the development server run:

```sh
bun run dev
```

The API server will be live on http://localhost:3000/

## API

Uses Elysia for managing routing and puppeteer to fetch the HTML of the page and retrieve meta data.

Send a request with any URL, :

```sh
http://localhost:3000?url=https://www.imdb.com/
```

Responds with the metadata, OpenGraph data and used fonts


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
