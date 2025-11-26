# Webpack Template
## Getting Started
To begin, go to `package.json` and update the fields `name`, `version`, `description` and `author`. 
```
{
  "name": "webpack-template", <- UPDATE
  "version": "1.0.0", <- UPDATE
  "description": "", <- UPDATE
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack serve --config webpack.dev.js",
    "deploy": "git subtree push --prefix dist origin gh-pages"
  },
  "keywords": [],
  "author": "", <- UPDATE
  ...
}
```
Then, update `package-lock.json` to reflect the `name` and `version` values you input in `package.json` (__NOTE__: This will be done twice in the file: once at the top of the fields and again for the first package listed).
```
{
  "name": "webpack-template", <- Update name here
  "version": "1.0.0", <- Update version here
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "webpack-template", <- AND update name here
      "version": "1.0.0", <- AND update version here
      ...
    },
    ...
  }
}
```

## Scripts
To build, use `npm run build`.

To deploy dev server, use `npm run dev`.

To deploy to production branch (`gh-pages`), use `npm run deploy`.