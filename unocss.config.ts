import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetWind,
  presetUno,
  presetWebFonts,
  presetIcons,
} from 'unocss';
import * as fs from 'fs';
import * as path from 'path';
import { theme } from './tailwind.config.cjs';

const shortcuts: [string, string][] = [
  /* Example: ['name','uno-classes'] */
  ['flex-center', 'flex justify-center items-center'],
  ['opas', 'hover:opacity-70 transition-opacity'],
];

const config = defineConfig({
  shortcuts,
  // WebStorm don't support unocss config, so theme put in tailwind.config.cjs
  theme: theme.extend,
  rules: [
    [/^size-(\d+)$/, ([, d]) => {
      const size = `${(Number(d)) / 4}rem`;

      return { width: size, height: size };
    }],
  ],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('max-')) return matcher;

      const [variant, ...rest] = matcher.split(':');

      const mediaPx = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      }[variant.replace('max-', '')] || 0;

      if (mediaPx == 0) return matcher;

      return {
        matcher: rest.join(':'),
        parent: `@media (max-width: ${mediaPx}px)`,
      };
    },
    (matcher) => {
      if (!matcher.startsWith('hocus:')) return matcher;

      return {
        matcher: matcher.slice(6),
        selector: (s) => `${s}:hover, ${s}:focus`,
      };
    },
  ],
  presets: [
    presetUno(),
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: 'Roboto',
      },
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        height: 'auto',
        'min-height': '1em',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});

// Create mock file for auto-complete
fs.writeFileSync(
  path.join(__dirname, '/src/assets/style/mock.css'),
  shortcuts.map(([name]) => `.${name} {}`).join('\n'),
);

export default config;
