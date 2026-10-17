import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/*
 * Extra pages such as /partners are drawn by the same index.html as the
 * homepage. Static hosts look for a real file at that address, so a copy
 * of index.html is placed at dist/partners/index.html after each build.
 * Keep this list in step with "pages" in src/hooks/useCurrentPage.js.
 */
const extraPages = ['partners']

function copyIndexForExtraPages() {
  let outDir = 'dist'
  return {
    name: 'copy-index-for-extra-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      for (const page of extraPages) {
        mkdirSync(resolve(outDir, page), { recursive: true })
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, page, 'index.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyIndexForExtraPages()],
})
