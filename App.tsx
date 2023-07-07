import React from 'react';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createMirageServer } from './mock-api/server';

import { StatusBar } from 'react-native';
import MainAppContainer from './src/screens/containers/MainAppContainer';
import { persistor, store } from './src/store/store';
import { theme } from './src/theme/theme';

createMirageServer();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="light-content" backgroundColor={'#290437'} />
          <MainAppContainer />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
