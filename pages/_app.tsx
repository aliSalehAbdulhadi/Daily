import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../src/redux/store/store';
import { persistor } from '../src/redux/store/store';
import OverLay from '../src/components/overLay/OverLay';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OverLay>
          <Component {...pageProps} />
        </OverLay>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
