import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@i-o/design-system/design/tokens.css';
import '@i-o/ui/styles.css';
import './portal.css';
import './i18n';
import { IoProvider } from './io';
import { Shell } from './Shell';
import { HomePage } from './pages/HomePage';
import { HelpPage } from './pages/HelpPage';
import { RequestsPage } from './pages/RequestsPage';
import { RequestPage } from './pages/RequestPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { AssetPage } from './pages/AssetPage';
import { CatalogItemPage, CatalogPage } from './pages/CatalogPages';
import { ArticlePage, NotFoundPage, PreferencesPage, SearchPage } from './pages/OtherPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'help', element: <HelpPage /> },
      { path: 'requests', element: <RequestsPage /> },
      { path: 'requests/:id', element: <RequestPage /> },
      { path: 'technology', element: <TechnologyPage /> },
      { path: 'technology/:id', element: <AssetPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:id', element: <CatalogItemPage /> },
      { path: 'knowledge/:id', element: <ArticlePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'preferences', element: <PreferencesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IoProvider>
      <RouterProvider router={router} />
    </IoProvider>
  </StrictMode>,
);
