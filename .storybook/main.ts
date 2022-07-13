import css from 'unocss/vite';
import autoImport from 'unplugin-auto-import/vite';
import { mergeConfig } from 'vite';
import prevSettings from '../vite.config';
import react from '@vitejs/plugin-react';

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config: any) {
    return mergeConfig(config, {
      resolve: prevSettings.resolve,
      plugins: [
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
      ]
    });
  },
}
