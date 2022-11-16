import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import css from 'unocss/vite';
import { join as pathJoin } from 'path';
import autoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect';

const fromRoot = (path: string) => pathJoin(__dirname, path);

export default {
  server: {
    port: 3333,
  },
  resolve: {
    alias: {
      '~/': `${fromRoot('./src')}/`,
      $css: fromRoot('./src/assets/style/index.ts'),
      $public: fromRoot('./'),
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
          '~/helpers/valtioInspect': [['default', 'valtioInspect']],
          valtio: [['proxy', 'valtio'], ['useSnapshot', 'useValtio']],
          '@tanstack/react-query': ['useQuery', 'useQueryClient', 'useInfiniteQuery'],
          clsx: ['clsx'],
          react: ['Suspense'],
        },
      ],
    }),
    Inspect(),
  ],
} as UserConfig;
