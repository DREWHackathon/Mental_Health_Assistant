import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNav from './src/TabNav';

import { Provider } from 'react-redux'
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react' // local storage...

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <TabNav/>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
