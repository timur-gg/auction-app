/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import * as path from 'node:path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/apps/auction-app',
  server: {
    port: 4200,
    host: 'localhost',
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  resolve: {
    alias: {
      // Add your folder here for easy imports
      '@mocks': path.resolve(__dirname, './src/mocks'),
    },
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'], // Ensure these are auto-resolved
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../dist/apps/auction-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../coverage/apps/auction-app',
      provider: 'v8',
    },
  },
});
