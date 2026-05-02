import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'src/index.ts',
  output: {
    // CRITICAL: filename must be 'universal-remote-card.js' (no .min) 
    // HACS plugin validator requires a plain .js file matching/related to repo name
    file: path.join(__dirname, 'dist', 'universal-remote-card.js'),
    format: 'es',
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      sourceMap: false,
    }),
    terser({
      format: {
        comments: false,
      },
      compress: {
        drop_console: false,
        pure_getters: true,
        unsafe: false,
        passes: 2,
      },
      mangle: true,
    }),
  ],
  external: [],
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};
