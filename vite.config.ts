import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import css from 'unocss/vite';
import { join as pathJoin } from 'path';
import autoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect';

export default {
  resolve: {
    alias: {
      '~/': `${pathJoin(__dirname, './src')}/`,
    },
  },
  plugins: [
    react(),
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
            ['observer', 'mobxObserver'],
          ],
          '/src/hooks/O': [['default', 'O']],
        },
      ],
    }),
    Inspect(),
  ],
} as UserConfig;
