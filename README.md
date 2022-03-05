# sherlock-deno-web 🕵️ search users across 270+ websites in your browser

> :information_source: You can visit the website here: [sherlock.benjaminfayaz.de](sherlock.benjaminfayaz.de)

This project is a web client for the [deno implementation](https://github.com/checkerschaf/sherlock-deno) of the [sherlock project](https://github.com/sherlock-project/sherlock).

## Local Development
Since we fetch the site results directly in the browser, we need to avoid CORS via a CORS Proxy.
You can use any desired CORS proxy but in this case we are using the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) project.
For ease of use you can use one of the docker images like
```sh
docker run -p 3000:3000 psimonov/cors-anywhere
```
### Working with the original sherlock-deno
When you want to adjust code of the original [sherlock-deno](https://github.com/checkerschaf/sherlock-deno) project, you have to do the following steps:
1. Create a symlink of the original sherlock-deno project
```bash
ln -s PATH_TO_SHERLOCK_DENO PATH_TO_SHERLOCK_DENO_WEB/sherlock-deno
```
*This is necessary because in this web project we can't import external local modules [(see this issue for reference)](https://github.com/alephjs/aleph.js/issues/107)*

2. Change the import map of the sherlock module
```json
{
  ...
  "sherlock/": "https://deno.land/x/sherlock@v2.1.0/src",
}
```
becomes
```json
{
  ...
  "sherlock/": "./sherlock-deno/src/",
}
```

Now you can work with your local clone of both projects.