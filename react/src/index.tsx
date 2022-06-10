import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import { store } from './store/store';
import { Provider } from 'react-redux';

import { AppProvider } from './providers/AppProvider';

import { AppLayout } from './layouts/AppLayout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppProvider>
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  </AppProvider>
);
