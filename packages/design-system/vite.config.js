import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import pkg from './package.json' with { type: 'json' };

// Components are JSX in .js files (from Create React App), so .js is parsed as JSX.
const jsxInJs = {
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } }
};

const external = [
  'react', 'react-dom', 'react/jsx-runtime',
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  ...jsxInJs,
  css: { preprocessorOptions: { scss: { api: 'modern-compiler', silenceDeprecations: ['import', 'global-builtin'] } } },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      name: 'Io',
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'io.js' : 'io.cjs')
    },
    rollupOptions: {
      external: id => external.some(dep => id === dep || id.startsWith(dep + '/'))
    },
    sourcemap: true
  }
});
