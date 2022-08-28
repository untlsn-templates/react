import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import css from 'unocss/vite';
import { join as pathJoin } from 'path';
import autoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect';
import ssr from 'vite-plugin-ssr/plugin';

export default {
  server: {
    port: 3333,
  },
  resolve: {
    alias: {
      '~/': `${pathJoin(__dirname, './src')}/`,
      $css: pathJoin(__dirname, './src/assets/style/index.ts'),
      $public: pathJoin(__dirname, './'),
    },
  },
  plugins: [
    react(),
    ssr(),
    css(),
    autoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'react',
        'react-router-dom',
        {
          mobx: ['makeAutoObservable'],
          'mobx-react-lite': [
            'useLocalObservable',
            'observer',
          ],
          '/src/hooks/O': [['default', 'O']],
          'mobx-state-tree': [
            ['types', 'typex'],
          ],
        },
      ],
    }),
    Inspect(),
  ],
} as UserConfig;
