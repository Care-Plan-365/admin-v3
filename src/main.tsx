import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { ProviderProvider } from './context/ProviderContext';
import { PracticeContextProvider } from './context/PracticeContext';
import { PatientContextProvider } from './context/PatientContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProviderProvider>
          <PracticeContextProvider>
            <PatientContextProvider>
              <App />
            </PatientContextProvider>
          </PracticeContextProvider>
        </ProviderProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
