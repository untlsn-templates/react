import React, { StrictMode } from 'react';
import type { Root } from 'react-dom/client';
import { hydrateRoot, createRoot } from 'react-dom/client';
import type { PageContext } from '~/renderer/types';
import App from '~/renderer/App';
import '$css';

export const clientRouting = true;
export const hydrationCanBeAborted = true;

let renderRoot: Root;

export async function render(pageContext: PageContext) {
  pageContext.documentProps ||= {};

  const container = document.getElementById('root')!;
  const entry = (
    <StrictMode>
      <App {...pageContext} />
    </StrictMode>
  );

  if (container.innerHTML == '' || !pageContext.isHydration) {
    if (!renderRoot) {
      renderRoot = createRoot(container);
    }
    renderRoot.render(entry);
  } else {
    renderRoot = hydrateRoot(container, entry);
  }
}
