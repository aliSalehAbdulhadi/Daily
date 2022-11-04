import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../src/redux/store/store';
import { persistor } from '../src/redux/store/store';
import Wrapper from '../src/components/wrapper/wrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Daily</title>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
