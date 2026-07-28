// Copies the production build (dist/) into docs/, which is what GitHub
// Pages actually serves (see repo Settings > Pages). docs/CNAME is left
// alone. This only updates your working tree — review the diff and
// commit/push docs/ yourself.
import { existsSync, rmSync, cpSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const docs = path.join(root, 'docs')

if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` first.')
  process.exit(1)
}

rmSync(path.join(docs, 'index.html'), { force: true })
rmSync(path.join(docs, 'static'), { recursive: true, force: true })

cpSync(path.join(dist, 'index.html'), path.join(docs, 'index.html'))
cpSync(path.join(dist, 'static'), path.join(docs, 'static'), { recursive: true })

console.log('Copied dist/ into docs/. Review the diff, then:\n  git add docs\n  git commit -m "Update site"\n  git push')
