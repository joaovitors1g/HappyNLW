import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import './src/config/ReactotronConfig';
import { Provider } from 'react-redux';

import { AppLoading } from 'expo';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppIndex from './src';
import api from './src/services/api';
import { signOut } from './src/store/modules/auth/actions';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        store.dispatch(signOut());
      }
    );
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppIndex />
      </PersistGate>
    </Provider>
  );
}
