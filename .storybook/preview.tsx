import '$css'
import { HashRouter } from 'react-router-dom';
import HeadProvider from '~/components/providers/HeadProvider';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story: any) => (
    <HeadProvider>
      <HashRouter>
        <div className="text-text dark:text-dark-text">
          <Story />
        </div>
      </HashRouter>
    </HeadProvider>
  )
]
