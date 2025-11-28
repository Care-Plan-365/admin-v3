import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { PracticeContextProvider } from './context/PracticeContext';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/admin-v3">
        <PracticeContextProvider>
          <App />
        </PracticeContextProvider>
      </HashRouter>
    </ReduxProvider>
  </StrictMode>,
);
