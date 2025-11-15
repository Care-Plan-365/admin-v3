import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { ProviderProvider } from './context/ProviderContext';
import { PracticeContextProvider } from './context/PracticeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProviderProvider>
          <PracticeContextProvider>
            <App />
          </PracticeContextProvider>
        </ProviderProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
