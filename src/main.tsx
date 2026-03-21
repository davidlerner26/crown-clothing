import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import App from './App';
import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';

import { createRoot, type Container } from 'react-dom/client';

createRoot(document.getElementById('root') as Container).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
