<p align="center">
  <img src="public/logo.png" alt="Logo" height="90" />
</p>

[![MIT](https://img.shields.io/github/license/rvgpl/meta)](https://github.com/rvgpl/meta/blob/main/LICENSE)

# Meta

Extract metadata from any website with an API call. The API allows fetching of metatags, open graph data and schema tags.

Built with [Elysia](https://elysiajs.com/) + [Cheerio](https://cheerio.js.org/) with [Bun](https://bun.sh/) runtime

## API

Uses Elysia for managing routing and cheerio to parse the HTML of the page and retrieve meta data.

The server is deployed using Docker on [Fly.io](https://fly.io). You can use the GET API with the any URL as a query parameter.

Send a request with any URL :

```
https://getmetadata.fly.dev/v1/meta?url=<insert_url_to_fetch_metadata>
```

Responds with the metadata, OpenGraph data and used [Schema](https://schema.org) tags

# Demo


Here is an example of fetching data from a Wikipedia article about Batman [https://en.wikipedia.org/wiki/Batman](https://en.wikipedia.org/wiki/Batman)

```
https://getmetadata.fly.dev/v1/meta?url=https://en.wikipedia.org/wiki/Batman
```

which returns the following JSON.

```json
{
  "meta": {
    "title": "Batman - Wikipedia",
    "description": "Batman"
  },
  "openGraph": {
    "image": "https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg",
    "image:width": "640",
    "image:height": "1061",
    "title": "Batman - Wikipedia",
    "type": "website"
  },
  "schema": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "name": "Batman",
      "url": "https://en.wikipedia.org/wiki/Batman",
      "sameAs": "http://www.wikidata.org/entity/Q2695156",
      "mainEntity": "http://www.wikidata.org/entity/Q2695156",
      "author": {
        "@type": "Organization",
        "name": "Contributors to Wikimedia projects"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wikimedia Foundation, Inc.",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.wikimedia.org/static/images/wmf-hor-googpub.png"
        }
      },
      "datePublished": "2001-10-23T04:05:04Z",
      "dateModified": "2023-10-28T07:19:29Z",
      "image": "https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg",
      "headline": "comic book superhero"
    }]
}
```
## Local Development
To get started, clone this repo, and paste this command into your terminal to install the dependencies:

```sh
bun install
```

and to start the development server run:

```sh
bun run dev
```

The API server will be live on http://localhost:3000/


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
