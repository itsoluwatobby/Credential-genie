import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webpack from 'webpack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // if (typeof process !== 'undefined') {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          stream: import.meta.resolve('stream-browserify'),
          crypto: import.meta.resolve('crypto-browserify'),
        };
      // }

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
        new webpack.NormalModuleReplacementPlugin(
          /node:crypto/,
          (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          }
        )
      );
    }
    return config;
  },
})
