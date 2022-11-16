import { useDocumentProps } from '~/renderer/PageContext';

const useDocumentTitle = (title: string) => {
  useDocumentProps().title = title;
  if (!import.meta.env.SSR) {
    document.title = title;
  }
};

export default useDocumentTitle;
