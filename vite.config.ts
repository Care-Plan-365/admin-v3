import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { copyFileSync } from 'fs'
//  import { join } from 'path'
// import { readFileSync } from 'fs'

// Read the repository name from the config file
// const repoConfig = readFileSync(join(__dirname, 'src', 'config', 'repo.ts'), 'utf-8')
// const repoMatch = repoConfig.match(/export const REPO_NAME = ['"](.+?)['"]/)
// const REPO_NAME = repoMatch ? repoMatch[1] : 'admin-v3'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // {
    //   name: 'copy-404',
    //   closeBundle() {
    //     // Copy index.html to 404.html for GitHub Pages SPA routing
    //     copyFileSync(
    //       join(__dirname, 'dist', 'index.html'),
    //       join(__dirname, 'dist', '404.html')
    //     )
    //   },
    // },
  ],
  build:{
    outDir: 'dist',
  },
  base: `/admin-v3/`,
})
