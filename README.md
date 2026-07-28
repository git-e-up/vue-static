# static-matt-site

> A Vue 2 project, built with Vite.

## Requirements

- Node >= 20.19 (Vite 7's minimum). Check with `node -v`.
  - If you're on an older Node via nvm: `nvm install 20 && nvm use 20`.

## Running locally

``` bash
# install dependencies
npm install

# serve with hot reload
npm run dev
```

This starts the Vite dev server on `http://localhost:8080` (if that port's
taken, Vite will pick the next free one and print the URL — check the
terminal output).

## Building

``` bash
# build for production, output goes to dist/
npm run build

# preview the production build locally before deploying
npm run preview
```

## Linting

``` bash
npm run lint
```

## Deploying

`npm run deploy` runs `vue-gh-pages`, which builds the site and copies the
output into `docs/` (with root-relative asset paths stripped to relative
ones). It does **not** push automatically — after it finishes, review and
commit/push the changes in `docs/` yourself:

``` bash
npm run deploy
git add docs
git commit -m "Update site"
git push
```

GitHub Pages serves this site from the `docs/` folder on `master`, pointed
at the custom domain in `docs/CNAME`.
