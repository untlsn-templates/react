import '$css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PageContext } from '~/renderer/types';
import DefaultLayout from '~/layouts/default';
import { PageCtx } from '~/renderer/PageContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10_000,
    },
  },
});

function App(pageContext: PageContext) {
  const Layout = (
    pageContext.exports.Layout || DefaultLayout
  ) as (props: { children: any, }) => any;

  const { Page, pageProps } = pageContext;
  return (
    <PageCtx.Provider value={pageContext}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Page {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </PageCtx.Provider>
  );
}

export default App;
