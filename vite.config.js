import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: {
    //   process: require.resolve('process/browser'),
    // },
    alias: {
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
    },
  },
  plugins: [react(), {
    name: 'replace-crypto',
    configureServer: ({ middlewares }) => {
      middlewares.use((req, res, next) => {
        if(req.path === '/node:crypto') {
          req.url = req.url.replace('/node:crypto', '')
        }
        next()
      })
    }
  }],
  define: {
    global: "globalThis",
  }
})
